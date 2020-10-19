import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Article from './Article'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import Pagination from '@material-ui/lab/Pagination'
import { Box } from '@material-ui/core'

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
        page: 1,
        loading: false,
    }

    componentDidMount() {
        this.setState({ loading: true })
        console.log("loading headlines...")
        fetch('https://mewyolkthymes.herokuapp.com/api/top-headlines')
            .then(data => data.json())
            .then(data => data["articles"])
            .then(data => {
                this.setState({ data: data, loading: false })
            })
    }

    contains = (text, query) => {
        if(query === "") return true;
        if(text === null) return false;
        return text.toLowerCase().includes(query.toLowerCase());
    }

    getPageCount = (array) => {
        return Math.ceil(array.length / ARTICLES_PER_PAGE);
    }

    updatePage = (event, value) => {
        this.setState({page: value})
    }

    render() {
        var query = this.props.searchTerm;
        var filteredItem = this.state.data.filter(article => {
            var textMatch = this.contains(article["title"], query)
                            || this.contains(article["content"], query)
                            || this.contains(article["description"], query)
            return textMatch
        })

        var start = (this.state.page - 1) * ARTICLES_PER_PAGE;
        if(start > filteredItem.length) start = 0;
        var end = start + ARTICLES_PER_PAGE;

        var displayedItems = filteredItem.slice(start, end);
        
        return (
            <>
                <Box alignItems="center" justifyContent="center" display="flex" margin="15px">
                    <Pagination count={this.state.loading ? 1 : this.getPageCount(filteredItem)} defaultPage={1} siblingCount={4}
                        color="secondary" onChange={this.updatePage} />
                </Box>
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