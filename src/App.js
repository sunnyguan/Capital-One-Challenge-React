import React from 'react';
import './css/App.css';
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import ModernNews from './components/ModernNews'

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

function App() {
  const [theme, setTheme] = React.useState(true)
  const appliedTheme = createMuiTheme(theme ? light : dark)

  return (
    <ThemeProvider theme={appliedTheme}>
      <ModernNews setTheme={setTheme(!theme)} />
    </ThemeProvider>
  )

}

export default App;
