import React from 'react'
import {Switch, Route} from 'react-router-dom'
import GlobalFeed from './pages/GlobalFeed/GlobalFeed'
import Article from './pages/Article/Article'

export default () => (
  <Switch>
    <Route path="/" exact component={GlobalFeed} />
    <Route path="/articles/:slug" component={Article} />
  </Switch>
)
