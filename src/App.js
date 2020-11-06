import React from 'react'
import './all.css'

class App extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            key: 1,
            items: [],
            isLoaded: false,
            items2: [],
            isLoaded2: false,
            imgUrl: [],
            search: ['work', 'job', 'corporate', 'hr', 'human resources', 'office', 'hire', 'meeting', 'board room', 'contract']
        }

    }

    randomSearch = (items) => {
        return items[Math.floor(Math.random() * items.length)]
    }

    theFetch = () => {
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

        fetch(`https://pixabay.com/api/?key=15416997-ea9683b19c946a25c1f0b4d67&q=${this.randomSearch(this.state.search)}&image_type=photo&pretty=true`)
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

    componentDidMount() {
        this.theFetch()
    }

    render() {

        const { isLoaded, isLoaded2, items, imgUrl } = this.state;

        const myStyle = {
            backgroundImage: `url(${imgUrl})`,
        }

        if (!isLoaded && !isLoaded2)
            return <div>Loading...</div>

        return (
            <div style={myStyle} className="my-style">
                <div className="my-style-2">
                    {items.phrase}
                    <svg
                        className="animate rotate"
                        onClick={this.theFetch}
                        id="Capa_1"
                        enableBackground="new 0 0 551.13 551.13"
                        height="10%"
                        viewBox="0 0 551.13 551.13"
                        width="10%"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="m482.239 310.011c0 113.966-92.707 206.674-206.674 206.674s-206.674-92.708-206.674-206.674c0-102.208 74.639-187.086 172.228-203.562v65.78l86.114-86.114-86.114-86.115v71.641c-116.653 16.802-206.673 117.139-206.673 238.37 0 132.955 108.164 241.119 241.119 241.119s241.119-108.164 241.119-241.119z" />
                    </svg>
                </div>
            </div>
        );

    }

}

export default App