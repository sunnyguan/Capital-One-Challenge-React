import React, { Component } from 'react'

import '../css/vintage.css'
import 'fontsource-roboto'

import VintageArticle from './VintageArticle'

class VintageNews extends Component {

    state = {
        data: [],
        loading: true
    }

    componentDidMount() {
        fetch('https://mewyolkthymes.herokuapp.com/api/top-headlines')
            .then(data => data.json())
            .then(data => data["articles"])
            .then(data => {
                this.setState({ data: data, loading: false })
            })
    }

    chunk(arr, len) {

        var chunks = [],
            i = 0,
            n = arr.length;

        while (i < n) {
            chunks.push(arr.slice(i, i += len));
        }

        return chunks;
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    render() {
        var articles = this.shuffle(this.state.data);
        var chunks = this.chunk(articles.slice(1), (articles.length - 1) / 3);
        if (!this.state.loading) console.log(chunks)
        return (
            <> 
                <>
                    <div>
                        <div className="head">
                            <div className="headerobjectswrapper">
                                <header>Mew Yolk Thymes</header>
                            </div>

                            <div className="subhead">Somewhere, Over the Rainbow - Thursday August 30, 1978 - $0.10 <a href="/"
                                style={{ color: "black" }}>Modern</a></div>
                        </div>
                        <div className="content">
                        {!this.state.loading ? 
                                <>
                                    <h2>Loading...</h2>
                                    <div className="collumns">
                                        <div className="sidebar collumn">
                                            {chunks[0].map((value, index) => {
                                                            return <VintageArticle key={index} article={value} />
                                            })}
                                        </div>
                                        <div className="main-vintage collumn">
                                            <VintageArticle article={articles[0]} />

                                            <div className="right-one slab">
                                                {chunks[1].map((value, index) => {
                                                    return <VintageArticle key={index} article={value} />
                                                })}
                                            </div>
                                            <div className="right-two float-right slab">
                                                {chunks[2].map((value, index) => {
                                                    return <VintageArticle key={index} article={value} />
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : <></>
                                }
                        </div>
                    </div>
                </>
            </>
        )
    }
}

export default VintageNews