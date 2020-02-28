import React from 'react'
import './all.css'

function randomSearch(items) {

    return items[Math.floor(Math.random() * items.length)];

}

class App extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            items: [],
            isLoaded: false,
            items2: [],
            isLoaded2: false,
            imgUrl: [],
            search: ['work', 'job', 'corporate', 'hr', 'human resources', 'office', 'hire', 'meeting', 'board room', 'contract']
        }

    }

    componentDidMount() {

        fetch('https://corporatebs-generator.sameerkumar.website/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    items: json,
                    isLoaded: true,
                })
            }).catch((err) => {
                console.log(err);
            });

        fetch(`https://pixabay.com/api/?key=15416997-ea9683b19c946a25c1f0b4d67&q=${randomSearch(this.state.search)}&image_type=photo&pretty=true`)
            .then(res => res.json())
            .then(json => {
                const rndNumb = Math.floor((Math.random() * json.hits.length))
                this.setState({
                    items2: json,
                    isLoaded2: true,
                    imgUrl: json.hits[rndNumb].largeImageURL
                })
            }).catch((err) => {
                console.log(err);
            });

    }

    render() {

        const { isLoaded, isLoaded2, items, imgUrl } = this.state;

        const myStyle = {
            backgroundImage: `url(${imgUrl})`,
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }

        const myStyle2 = {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            width: '90%',
            height: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '3px',
            padding: '10px',
            textAlign: 'center'
        }

        if (!isLoaded && !isLoaded2)
            return <div>Loading...</div>;

        return (
            <div style={myStyle}>
                <div style={myStyle2}>
                    {items.phrase}
                </div>
            </div>
        );

    }

}

export default App;