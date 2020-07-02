import React from 'react'
import {Link} from 'react-router-dom'

export const Feed = ({articles}) => (
  <>
    {articles.map((article, index) => (
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
            <span className="date">{article.createdAt}</span>
          </div>
        </div>
        <div className="preview-link">
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <Link to={`/articles/${article.slug}`}>
            <span>Read more...</span>
          </Link>
          <ul className="tag-list">
            {article.tagList.map(tag => (
              <li
                key={`tag-${tag}`}
                className="tag-default tag-pill tag-outline"
              >
                <Link to={`/tags/${tag}`}>{tag}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </>
)

export default Feed
