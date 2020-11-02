import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Article from './Article'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import Pagination from '@material-ui/lab/Pagination'
import { Box } from '@material-ui/core'
import { ToggleCategory } from './ToggleCategory'
import { Typography } from '@material-ui/core'
import { retrieve } from '../services/FetchArticles';

const ARTICLES_PER_PAGE = 12;

// ArticlesGrid Component represents a grid of news cards along with pagination and toggles
class ArticlesGrid extends Component {

    // return the number of columns for the grid depending on the width of screen
    getGridListCols = () => {
        if (isWidthUp('xl', this.props.width))
            return 4
        if (isWidthUp('lg', this.props.width))
            return 3
        if (isWidthUp('md', this.props.width))
            return 2;
        return 1;
    }

    state = {
        data: [], // articles
        error: false, // News API fetch error
        open: false, // whether the iframe is opened or not
        page: 1, // current pagination index
        filters: { "entertainment": true, "sports": true, "technology": true }, // toggle filters booleans
        loading: true, // whether the articles have been loaded from API
        src: "about:blank" // iframe source
    }

    // fetch the three categories of news articles when the component first mounts
    componentDidMount() {
        retrieve().then(newState => {
            this.setState(newState);
        });
    }

    // safely check if the text string contains the query string
    contains = (text, query) => {
        if (query === "") return true;
        if (text === null) return false;
        return text.toLowerCase().includes(query.toLowerCase());
    }

    // get the number of pages required for pagination
    getPageCount = (array) => {
        return Math.ceil(array.length / ARTICLES_PER_PAGE);
    }

    // update the page index
    updatePage = (...[, value]) => {
        this.setState({ page: value })
    }

    // update the filters for toggles
    updateFilters = (filters) => {
        this.setState({ filters: filters })
    }

    // show an article in the iframe popup
    showIframe = (url) => {
        this.setState({ src: url, open: true })
    }

    // cleans the iframe source on close
    close = () => {
        this.setState({ src: "about: blank", open: false })
    }

    // renders the grid of articles as well as the filters
    render() {
        var query = this.props.searchTerm;

        // filters articles according to the toggles and the search term
        var filteredItem = this.state.data.filter(article => {
            var type1 = (article["label"] === "entertainment" && this.state.filters.entertainment)
            var type2 = (article["label"] === "sports" && this.state.filters.sports)
            var type3 = (article["label"] === "technology" && this.state.filters.technology)
            var textMatch = this.contains(article["title"], query)
                || this.contains(article["content"], query)
                || this.contains(article["description"], query)
            return textMatch && (type1 || type2 || type3)
        })

        // find the start and end article index
        var start = (this.state.page - 1) * ARTICLES_PER_PAGE;
        if (start > filteredItem.length) start = 0;
        var end = start + ARTICLES_PER_PAGE;

        // select the articles to be displayed
        var displayedItems = filteredItem.slice(start, end);

        // renders the component
        return (
            <>
                <div className={`custom-model-main ${this.state.open ? 'model-open' : ''}`}>
                    <div className="custom-model-inner">
                        <div className="close-btn" onClick={this.close}>×</div>
                        <div className="custom-model-wrap">
                            <div className="pop-up-content-wrap">
                                <iframe id="frame" title="inline content view" src={this.state.src} style={{ width: "100%", height: "80vh" }}></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="bg-overlay" onClick={this.close}></div>
                </div>

                <ToggleCategory updateFilters={this.updateFilters} />
                <Box alignItems="center" justifyContent="center" display="flex" margin="15px">
                    <Pagination 
                        count={this.state.loading ? 1 : this.getPageCount(filteredItem)} 
                        defaultPage={1} 
                        siblingCount={4}
                        color="secondary" 
                        onChange={this.updatePage} 
                    />
                </Box>
                {this.state.loading || this.state.error
                    ?
                    <Typography variant="h5" className="heading">
                        {this.state.error ? "Error fetching from API" : "Loading..."}
                    </Typography>
                    : <>
                        {displayedItems.length > 0
                            ?
                            <Grid container spacing={3}>
                                {displayedItems.map((article, id) => {
                                    return (
                                        <Grid item key={id} xs={12 / this.getGridListCols()}>
                                            <Article article={article} showIframe={this.showIframe} />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                            :
                            <Typography variant="h5" className="heading">
                                No articles found.
                                </Typography>
                        }
                    </>
                }
            </>
        )
    }
}

export default withWidth()(ArticlesGrid);