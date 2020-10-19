import React, { Component } from 'react'

import '../css/modern.css'
import 'fontsource-roboto'

import { Typography } from '@material-ui/core'

import ArticlesGrid from './ArticlesGrid'
import { ToggleCategory } from './ToggleCategory'
import { VintageExpand, SearchBox, ToggleStyle } from './Tools'

import Pagination from '@material-ui/lab/Pagination';
import { Box } from '@material-ui/core'

class ModernNews extends Component {

    state = {
        page: 1,
        pageCount: 1
    }

    updatePage = (event, pageNumber) => {
        this.setState({
            page: pageNumber
        })
    }

    updatePageCount = (pageNumber) => {
        console.log("new page count received: " + pageNumber)
        this.setState({
            pageCount: pageNumber
        })
    }

    render() {
        return (
            <div className="main">
                <Typography variant="h3" className="heading">
                    Mew Yolk Thymes
                </Typography>

                <VintageExpand />
                <SearchBox />
                <ToggleCategory />
                <ToggleStyle />

                <Box alignItems="center" justifyContent="center" display="flex" margin="15px">
                    <Pagination count={this.state.pageCount} defaultPage={1} siblingCount={4} 
                        color="secondary" onChange={this.updatePage} />
                </Box>

                <ArticlesGrid page={this.state.page} updatePageCount={this.updatePageCount} />
            </div>
        )
    }
}

export default ModernNews