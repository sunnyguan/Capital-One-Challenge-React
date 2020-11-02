import React, { Component } from 'react'
import '../css/modern.css'
import 'fontsource-roboto'
import { Typography } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { VintageExpand, SearchBox, ToggleStyle } from './Tools'
import CssBaseline from '@material-ui/core/CssBaseline';
import ArticlesGrid from './ArticlesGrid'

// declares the constants for dark mode and light mode
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

// ModernNews Component contains the the modern view, which uses ArticlesGrid as well as some surrounding components
class ModernNews extends Component {

    state = {
        searchTerm: "", // current search term
        theme: false // dark theme boolean
    }

    // update the current search term
    updateSearch = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.setState({ searchTerm: e.target.value })
        }
    }

    // toggles dark theme
    toggleTheme = () => {
        this.setState({ theme: !this.state.theme })
    }

    // renders the modern view according to the selected theme and search filters
    render() {
        // creates theme to be applied to the entire component
        const theme = createMuiTheme({
            palette: {
                type: this.state.theme ? "dark" : "light",
            },
        });
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box width="95%" style={{margin: "auto"}}>
                    <SearchBox updateSearch={this.updateSearch} />
                    <Typography variant="h3" className="heading">
                        <img alt="mew yolk thymes icon" width="42px" src="/icon.png" /> 
                        Mew Yolk Thymes
                    </Typography>

                    <VintageExpand />
                    <ToggleStyle toggleTheme={this.toggleTheme} />

                    <ArticlesGrid searchTerm={this.state.searchTerm} />
                </Box>
            </ThemeProvider>
        )
    }
}

export default ModernNews