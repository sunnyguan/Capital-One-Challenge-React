import React, { Component } from 'react'

class VintageArticle extends Component {

    clean = (text) => {
        if (text === null || text === "null") return "";
        return text;
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    render() {
        var article = this.shuffle(this.props.article);
        return (
            <>
                <div className="half-slabs">
                    <div className="head">
                        {article.urlToImage !== null ? <img alt="attached" className="hoverGray" src={article.urlToImage} width="100%" /> : <></>}
                        <h3 className="headline hl3">{article.title}</h3>
                        <p>
                            <span className="headline hl4">
                                <a href={article.url} rel="noopener noreferrer" target="_blank">{article.source.name}</a>
                            </span>
                        </p>
                    </div>
                    <p>{this.clean(article.content)}</p>
                    <hr />
                </div>
            </>
        )
    }
}

export default VintageArticle