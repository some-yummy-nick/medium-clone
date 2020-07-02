import React from 'react'
import {Switch, Route} from 'react-router-dom'
import GlobalFeed from 'pages/GlobalFeed/GlobalFeed'
import Article from 'pages/Article/Article'
import Authentication from 'pages/Authentication/Authentication'
import TagFeed from 'pages/TagFeed/TagFeed'
import YourFeed from 'pages/YourFeed/YourFeed'

export default () => (
  <Switch>
    <Route path="/" exact component={GlobalFeed} />
    <Route path="/feed" component={YourFeed} />
    <Route path="/tags/:slug" component={TagFeed} />
    <Route path="/login" component={Authentication} />
    <Route path="/register" component={Authentication} />
    <Route path="/articles/:slug" component={Article} />
  </Switch>
)
