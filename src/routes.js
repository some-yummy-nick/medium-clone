import React from 'react'
import {Switch, Route} from 'react-router-dom'

import GlobalFeed from 'pages/GlobalFeed/GlobalFeed'
import Article from 'pages/Article/Article'
import Authentication from 'pages/Authentication/Authentication'
import TagFeed from 'pages/TagFeed/TagFeed'
import YourFeed from 'pages/YourFeed/YourFeed'
import CreateArticle from 'pages/CreateArticle/CreateArticle'
import EditArticle from 'pages/EditArticle/EditArticle'
import Settings from 'pages/Settings/Settings'
import NotFound from 'pages/NotFound/NotFound'

export default () => (
  <Switch>
    <Route path="/" exact component={GlobalFeed} />
    <Route path="/feed" component={YourFeed} />
    <Route path="/tags/:slug" component={TagFeed} />
    <Route path="/login" component={Authentication} />
    <Route path="/register" component={Authentication} />
    <Route path="/articles/new" component={CreateArticle} />
    <Route path="/articles/:slug" component={Article} exact />
    <Route path="/articles/:slug/edit" component={EditArticle} />
    <Route path="/settings" component={Settings} />
    <Route path="/" component={NotFound} />
  </Switch>
)
