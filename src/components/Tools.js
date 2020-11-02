import React from 'react'

import { Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

// VintageExpand component inserts the hover link to vintage site
export const VintageExpand = () =>
    <div id="rec">
        <img alt="show vintage svg" id="right-svg" src="/right.svg" />
        <Button href="/vintage" className="vintage-link">Vintage</Button>
    </div>

// SearchBox component creates the search box for filtering news articles
export const SearchBox = ({ updateSearch }) => 
    <form className="search-container">
        <TextField className="search-box" id="outlined-basic" label="Search" variant="outlined" onKeyDown={updateSearch} />
    </form>

// ToggleStyle handles dark mode toggling
export const ToggleStyle = ({ toggleTheme }) => {

    // keep tracks of the current theme
    const [state, setState] = React.useState({
        darkMode: false
    });

    // handles dark theme toggle
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    // handles toggle event
    const handleDarkMode = (event) => {
        handleChange(event);
        toggleTheme();
    }

    return (
        <FormGroup row style={{ display: "block", textAlign: "center", width: "100%" }}>
            <FormControlLabel label="Dark Mode"
                control={
                    <Switch 
                        checked={state.darkMode} 
                        onChange={handleDarkMode} 
                        name="darkMode"
                        color="primary" 
                    />
                }
            />
        </FormGroup >
    );
}

