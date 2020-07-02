import React from 'react'
import {Link} from 'react-router-dom'

export const TagList = ({tags}) => (
  <>
    {tags.length ? (
      <ul className="tag-list">
        {tags.map(tag => (
          <li key={`tag-${tag}`} className="tag-default tag-pill tag-outline">
            <Link to={`/tags/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    ) : (
      ''
    )}
  </>
)

export default TagList
