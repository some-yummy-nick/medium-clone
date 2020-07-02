import React from 'react'
import {Switch, Route} from 'react-router-dom'
import GlobalFeed from 'pages/GlobalFeed/GlobalFeed'
import Article from 'pages/Article/Article'
import Authentication from 'pages/Authentication/Authentication'
import TagFeed from 'pages/TagFeed/TagFeed'

export default () => (
  <Switch>
    <Route path="/" exact component={GlobalFeed} />
    <Route path="/tags/:slug" component={TagFeed} />
    <Route path="/login" component={Authentication} />
    <Route path="/register" component={Authentication} />
    <Route path="/articles/:slug" component={Article} />
  </Switch>
)
