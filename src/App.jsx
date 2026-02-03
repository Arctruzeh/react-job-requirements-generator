import React, { useState, useEffect, useCallback, useRef } from 'react'
import './all.css'
import { BiRefresh } from 'react-icons/bi'

// Error Boundary Component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {
            return <div className="error-message">Something went wrong. Please try again.</div>
        }
        return this.props.children
    }
}

const FADE_DURATION = 300; // in milliseconds, match this with CSS transition duration
const BUTTON_TEXTS = [
    "Synergize Content",
    "Ideate Solutions",
    "Leverage New Content",
    "Disrupt Status Quo",
    "Pivot Strategy",
    "Optimize Output",
    "Revolutionize Vision",
    "Accelerate Growth",
    "Transform Paradigms",
    "Maximize Potential"
];
const SEARCH_TERMS = ['work', 'job', 'corporate', 'hr', 'human resources', 'office', 'hire', 'meeting', 'board room', 'contract'];

const App = () => {
    const [items, setItems] = useState({ phrase: '' });
    const [imgUrl, setImgUrl] = useState('');
    const [currentButtonTextIndex, setCurrentButtonTextIndex] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    // Buffer for next content
    const [nextPhrase, setNextPhrase] = useState(null);
    const [nextImageUrl, setNextImageUrl] = useState(null);

    const randomSearch = (items) => {
        return items[Math.floor(Math.random() * items.length)]
    }

    const preloadImage = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve(url)
            img.onerror = () => reject(new Error(`Failed to load image: ${url}`))
            img.src = url
        })
    }

    const fetchNewData = async () => {
        try {
            const [bsResponse, pixabayResponse] = await Promise.all([
                fetch('https://corporatebs-generator.sameerkumar.website/'),
                fetch(`https://pixabay.com/api/?key=15416997-ea9683b19c946a25c1f0b4d67&q=${randomSearch(SEARCH_TERMS)}&image_type=photo&pretty=true`)
            ])

            const bsData = await bsResponse.json()
            const pixabayData = await pixabayResponse.json()

            let imageUrl = '';
            if (pixabayData.hits && pixabayData.hits.length > 0) {
                const rndNumb = Math.floor((Math.random() * pixabayData.hits.length))
                imageUrl = pixabayData.hits[rndNumb].largeImageURL
                await preloadImage(imageUrl)
            }

            return {
                phrase: bsData.phrase,
                imageUrl: imageUrl
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            // Return nulls or handle error appropriately if needed
            return { phrase: "Error loading content", imageUrl: "" };
        }
    };

    const prefetchNext = useCallback(async () => {
        const data = await fetchNewData();
        setNextPhrase(data.phrase);
        setNextImageUrl(data.imageUrl);
    }, []);

    const theFetch = useCallback(async () => {
        // Start fade out
        setFadeOut(true);

        // Wait for fade out animation to complete
        await new Promise(resolve => setTimeout(resolve, FADE_DURATION));

        let newPhrase = nextPhrase;
        let newImageUrl = nextImageUrl;

        // If next content isn't ready or invalid, fetch completely new data now
        if (!newPhrase || !newImageUrl) {
            const data = await fetchNewData();
            newPhrase = data.phrase;
            newImageUrl = data.imageUrl;
        }

        // Update content
        setItems({ phrase: newPhrase });
        setImgUrl(newImageUrl);

        // Clear buffer
        setNextPhrase(null);
        setNextImageUrl(null);

        setFadeOut(false);
        setCurrentButtonTextIndex(prev => (prev + 1) % BUTTON_TEXTS.length);

        // Start prefetching next content
        prefetchNext();
    }, [nextPhrase, nextImageUrl, prefetchNext]);

    // Initial mount
    useEffect(() => {
        // We can just call logic similar to theFetch but without fade-in blocking if desired, 
        // or just call theFetch() directly. 
        // Calling theFetch() will trigger initial fade-out/in sequence which is acceptable.
        theFetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const myStyle = {
        backgroundImage: `url(${imgUrl})`,
    }

    return (
        <ErrorBoundary>
            <div style={myStyle} className={`my-style ${fadeOut ? 'fade-out' : ''}`}>
                <div className="my-style-2">
                    <div className="phrase">{items.phrase}</div>
                    <button
                        onClick={theFetch}
                        className="refresh-button"
                    >
                        <BiRefresh className="button-icon" />
                        {BUTTON_TEXTS[currentButtonTextIndex]}
                    </button>
                </div>
            </div>
        </ErrorBoundary>
    )
}

export default App