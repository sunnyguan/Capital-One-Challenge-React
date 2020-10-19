import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Article from './Article'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const ARTICLES_PER_PAGE = 12;

class ArticlesGrid extends Component {

    getGridListCols = () => {
        if (isWidthUp('xl', this.props.width)) {
            return 4;
        }

        if (isWidthUp('lg', this.props.width)) {
            return 3;
        }

        if (isWidthUp('md', this.props.width)) {
            return 2;
        }

        return 1;
    }

    state = {
        data: [],
        loading: false,
    }

    componentDidMount() {
        this.setState({ loading: true })
        console.log("loading headlines...")
        fetch('http://localhost:5000/api/top-headlines')
            .then(data => data.json())
            .then(data => data["articles"])
            .then(data => {
                var pageCount = Math.ceil(data.length / ARTICLES_PER_PAGE);
                this.props.updatePageCount(pageCount);
                this.setState({ data, loading: false })
            })
    }

    render() {
        console.log("hey im rendering articles with page " + this.props.page)
        var start = Math.round((this.props.page - 1) * ARTICLES_PER_PAGE);
        console.log("start: " + start + ", end: " + (start + ARTICLES_PER_PAGE))
        var displayedItems = this.state.data.slice(start, start + ARTICLES_PER_PAGE);
        return (
            <>
                {this.state.loading
                    ? "loading"
                    : <>
                        <Grid container spacing={3}>
                            {displayedItems.map((article, id) => {
                                return (
                                    <Grid item key={id} xs={12 / this.getGridListCols()}>
                                        <Article article={article} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </>
                }
            </>
        )
    }
}

export default withWidth()(ArticlesGrid);