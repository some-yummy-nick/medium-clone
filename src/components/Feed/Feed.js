import React from 'react'
import {Link} from 'react-router-dom'

import TagList from 'components/TagList/TagList'
import AddToFavorite from 'components/AddToFavorite/AddToFavorite'
import {formatDate} from 'utils'

export const Feed = ({articles}) => (
  <>
    {articles.length ? (
      articles.map((article, index) => (
        <div className="article-preview" key={`article-${index}`}>
          <div className="article-meta">
            <Link to={`/profiles/${article.author.username}`}>
              <img src={article.author.image} alt="" />
            </Link>
            <div className="info">
              <Link
                to={`/profiles/${article.author.username}`}
                className="author"
              >
                {article.author.username}
              </Link>
              <span className="date">{formatDate(article.createdAt)}</span>
            </div>
            <div className="pull-xs-right">
              <AddToFavorite
                isFavorited={article.favorited}
                favoritesCount={article.favoritesCount}
                articleSlug={article.slug}
              />
            </div>
          </div>
          <div className="preview-link">
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <Link to={`/articles/${article.slug}`}>
              <span>Read more...</span>
            </Link>
            <TagList tags={article.tagList} />
          </div>
        </div>
      ))
    ) : (
      <div>No articles are here... yet.</div>
    )}
  </>
)

export default Feed
