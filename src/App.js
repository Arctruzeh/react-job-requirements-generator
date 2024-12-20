import React from 'react'
import './all.css'

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

class App extends React.Component {
    buttonTexts = [
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
    ]    

    constructor(props) {
        super(props)
        this.state = {
            key: 1,
            items: [],
            isLoaded: false,
            items2: [],
            isLoaded2: false,
            imgUrl: [],
            search: ['work', 'job', 'corporate', 'hr', 'human resources', 'office', 'hire', 'meeting', 'board room', 'contract'],
            currentButtonTextIndex: 0,
            nextPhrase: null,
            nextImageUrl: null
        }
    }

    preloadImage = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve(url)
            img.onerror = () => reject(new Error(`Failed to load image: ${url}`))
            img.src = url
        })
    }

    randomSearch = (items) => {
        return items[Math.floor(Math.random() * items.length)]
    }

    prefetchNext = async () => {
        const [bsResponse, pixabayResponse] = await Promise.all([
            fetch('https://corporatebs-generator.sameerkumar.website/'),
            fetch(`https://pixabay.com/api/?key=15416997-ea9683b19c946a25c1f0b4d67&q=${this.randomSearch(this.state.search)}&image_type=photo&pretty=true`)
        ])

        const bsData = await bsResponse.json()
        const pixabayData = await pixabayResponse.json()
        const rndNumb = Math.floor((Math.random() * pixabayData.hits.length))
        const imageUrl = pixabayData.hits[rndNumb].largeImageURL

        // Preload the next image
        await this.preloadImage(imageUrl)

        this.setState({
            nextPhrase: bsData.phrase,
            nextImageUrl: imageUrl
        })
    }

    theFetch = async () => {
        this.setState({ 
            fadeOut: true,
            isLoaded: false,
            isLoaded2: false,
            currentButtonTextIndex: (this.state.currentButtonTextIndex + 1) % this.buttonTexts.length
        })
        
        setTimeout(() => {
            if (this.state.nextPhrase && this.state.nextImageUrl) {
                this.setState({
                    items: { phrase: this.state.nextPhrase },
                    imgUrl: this.state.nextImageUrl,
                    nextPhrase: null,
                    nextImageUrl: null,
                    fadeOut: false,
                    isLoaded: true,
                    isLoaded2: true
                })
                this.prefetchNext()
            }
        }, 400)
    }
    componentDidMount() {
        this.theFetch()
        this.prefetchNext() // Start prefetching for next click
    }

    render() {
        const { items, imgUrl } = this.state

        const myStyle = {
            backgroundImage: `url(${imgUrl})`,
        }

        return (
            <ErrorBoundary>
                <div style={myStyle} className={`my-style ${this.state.fadeOut ? 'fade-out' : ''}`}>
                    <div className="my-style-2">
                        <div className="phrase">{items.phrase}</div>
                        <button 
                            onClick={this.theFetch}
                            className="refresh-button"
                        >
                            {this.buttonTexts[this.state.currentButtonTextIndex]}
                        </button>
                    </div>
                </div>
            </ErrorBoundary>
        )
    }}

export default App
