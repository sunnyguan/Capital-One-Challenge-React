import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

// ToggleCategory functional component provides functionality for toggling news categories
export const ToggleCategory = ({ updateFilters }) => {
    const [state, setState] = React.useState({
        entertainment: true,
        sports: true,
        technology: true
    });

    const handleChange = (event) => {
        var newState = { ...state, [event.target.name]: event.target.checked }
        setState(newState);
        updateFilters(newState);
    };

    return (
        <FormGroup row style={{ display: "block", textAlign: "center", width: "100%" }}>
            <FormControlLabel label="Entertainment"
                control={
                    <Switch checked={state.entertainment} onChange={handleChange} name="entertainment" />
                }
            />
            <FormControlLabel label="Sports"
                control={
                    <Switch checked={state.sports} onChange={handleChange} name="sports" />
                }
            />
            <FormControlLabel label="Technology"
                control={
                    <Switch checked={state.technology} onChange={handleChange} name="technology" />
                }
            />
        </FormGroup >
    );
}