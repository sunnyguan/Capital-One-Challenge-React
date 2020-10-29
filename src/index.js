import 'fontsource-roboto'
import React from 'react'
import { render } from 'react-dom'
import ModernNews from './components/ModernNews'
import VintageNews from './components/VintageNews'

import { Switch, Route, BrowserRouter } from 'react-router-dom'

render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={ModernNews} />
      <Route path='/vintage' component={VintageNews} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)