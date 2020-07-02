import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import TopBar from 'components/TopBar/TopBar'
import Routes from 'routes'
import {CurrentUserProvider} from 'contexts/currentUser'
import CurrentUserChecker from 'components/CurrentUserChecker/CurrentUserChecker'

const App = () => (
  <CurrentUserProvider>
    <CurrentUserChecker>
      <Router>
        <TopBar />
        <Routes />
      </Router>
    </CurrentUserChecker>
  </CurrentUserProvider>
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
