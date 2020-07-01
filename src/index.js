import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import TopBar from './components/TopBar/TopBar'
import Routes from './routes'
import {CurrentUserProvider} from './contexts/currentUser'

const App = () => (
  <CurrentUserProvider>
    <Router>
      <TopBar />
      <Routes />
    </Router>
  </CurrentUserProvider>
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
