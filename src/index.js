import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'

import Routes from './routes'

const App = () => (
  <>
    <h1>Welcome to Hooks</h1>
    <Router>
      <Routes />
    </Router>
  </>
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
