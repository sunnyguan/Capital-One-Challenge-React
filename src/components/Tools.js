import React from 'react'

import { Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

export const VintageExpand = () =>
    <div id="rec">
        <img alt="show vintage svg" id="right-svg" src="/right.svg" />
        <Button href="/vintage" className="vintage-link">Vintage</Button>
    </div>

export const SearchBox = ({ updateSearch }) => {

    return (
        <form className="search-container">
            <TextField id="outlined-basic" label="Search" variant="outlined" onKeyDown={updateSearch} />
            <img
                alt="search icon"
                className="search-icon"
                width={56}
                src="/search-icon.png"
            />
        </form>
    )
}

export const ToggleStyle = ({ toggleTheme }) => {

    const [state, setState] = React.useState({
        darkMode: false
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleDarkMode = (event) => {
        handleChange(event);
        toggleTheme();
    }

    return (
        <FormGroup row style={{ display: "block", textAlign: "center", width: "100%" }}>
            <FormControlLabel label="Dark Mode"
                control={
                    <Switch checked={state.darkMode} onChange={handleDarkMode} name="darkMode"
                        color="primary" />
                }
            />
        </FormGroup >
    );
}

