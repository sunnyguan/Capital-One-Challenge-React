import React, { Component } from 'react'

import '../css/modern.css'
import 'fontsource-roboto'

import { Typography } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core'
import { Box } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline';

import ArticlesGrid from './ArticlesGrid'
import { ToggleCategory } from './ToggleCategory'
import { VintageExpand, SearchBox, ToggleStyle } from './Tools'

export const light = {
    palette: {
        type: 'light',
    },
}

export const dark = {
    palette: {
        type: 'dark',
    },
}

class ModernNews extends Component {

    state = {
        searchTerm: "",
        theme: false
    }

    updateSearch = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.setState({ searchTerm: e.target.value })
        }
    }

    toggleTheme = (e) => {
        this.setState({ theme: !this.state.theme })
    }

    render() {
        console.log(this.state)
        const theme = createMuiTheme({
            palette: {
                type: this.state.theme ? "dark" : "light",
            },
        });
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box width="95%" style={{margin: "auto"}}>
                    <Typography variant="h3" className="heading">
                        Mew Yolk Thymes
                        </Typography>

                    <VintageExpand />
                    <SearchBox updateSearch={this.updateSearch} />
                    <ToggleCategory />
                    <ToggleStyle toggleTheme={this.toggleTheme} />

                    <ArticlesGrid searchTerm={this.state.searchTerm} />
                </Box>
            </ThemeProvider>
        )
    }
}

export default ModernNews