import React, { Component } from 'react'

// VintageArticle Component represents one article in the vintage view
class VintageArticle extends Component {

    clean = (text) => {
        if (text === null || text === "null") return "";
        return text;
    }

    render() {
        var article = this.props.article;
        var upperCaseCategory = article.label ? article.label.toUpperCase() : "";
        return (
            <div className="half-slabs">
                <div className="head">
                    {article.urlToImage !== null && <img alt="attached" className="hoverGray" src={article.urlToImage} width="100%" />}
                    <h3 className="headline hl3">{article.title}</h3>
                    <p>
                        <span className="headline hl4">
                            <a href={article.url} rel="noopener noreferrer" target="_blank">{article.source.name}</a>
                        </span>
                    </p>
                </div>
                <p>{upperCaseCategory} · {this.clean(article.content)}</p>
                <hr />
            </div>
        )
    }
}

export default VintageArticle