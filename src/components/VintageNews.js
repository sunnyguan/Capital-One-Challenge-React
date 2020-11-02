import React, { Component } from 'react'
import '../css/vintage.css'
import 'fontsource-roboto'
import VintageArticle from './VintageArticle'
import { retrieve } from '../services/FetchArticles';

// VintageNews is the main view for the vintage site
class VintageNews extends Component {

    state = {
        data: [], // articles
        error: false, // if there was an error fetching from News API
        loading: true // if the page is currently loading
    }

    // calls API when rendered
    componentDidMount() {
        retrieve().then(newState => {
            this.setState(newState);
        });
    }

    // separates an array into equally sized chunks
    chunk(arr, len) {
        var chunks = [],
            i = 0,
            n = arr.length;
        while (i < n)
            chunks.push(arr.slice(i, i += len))
        return chunks;
    }

    // shuffles news articles and makes sure that the first article always has an image
    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]]
        }
        while(a[0] && !a[0].urlToImage) {
            const j = Math.floor(Math.random() * (a.length));
            [a[0], a[j]] = [a[j], a[0]]
            console.log("re-shuffling...")
        }
        return a;
    }

    render() {
        var articles = this.shuffle(this.state.data)
        var chunks = this.chunk(articles.slice(1), (articles.length - 1) / 3)
        return (
            <div>
                <div className="head">
                    <div className="headerobjectswrapper">
                        <header>Mew Yolk Thymes</header>
                    </div>

                    <div className="subhead">
                        Somewhere, Over the Rainbow - Thursday August 30, 1978 - $0.10
                        <a href="/" style={{ color: "black", marginLeft: "5px" }}>Modern</a>
                    </div>
                </div>
                <div className="content">
                    {this.state.error ? <h2>Error occurred while fetching API!</h2> : <>
                        {!this.state.loading &&
                            <div className="columns">
                                <div className="sidebar collumn">
                                    {chunks[0].map((value, index) => <VintageArticle key={index} article={value} />)}
                                </div>
                                <div className="main-vintage collumn">
                                    <VintageArticle article={articles[0]} />
                                    <div className="right-one slab">
                                        {chunks[1].map((value, index) => <VintageArticle key={index} article={value} />)}
                                    </div>
                                    <div className="right-two float-right slab">
                                        {chunks[2].map((value, index) => <VintageArticle key={index} article={value} />)}
                                    </div>
                                </div>
                            </div>
                        }
                    </>}
                </div>
            </div>
        )
    }
}

export default VintageNews