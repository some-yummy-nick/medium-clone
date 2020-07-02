import React from 'react'
import {Link} from 'react-router-dom'
import classNames from 'classnames'

import {range} from 'utils'
import './pagination.css'

const PaginationItem = ({page, currentPage, url}) => (
  <li className={classNames('page-item', {active: currentPage === page})}>
    <Link to={`${url}?page=${page}`} className="page-link">
      {page}
    </Link>
  </li>
)

export const Pagination = ({total, limit, url, currentPage}) => {
  const pagesCount = Math.ceil(total / limit)
  const pages = range(1, pagesCount)
  return (
    <>
      {pages.length > 1 && (
        <ul className="pagination">
          {pages.map(page => (
            <PaginationItem
              page={page}
              currentPage={currentPage}
              url={url}
              key={`pagination-${page}`}
            />
          ))}
        </ul>
      )}
    </>
  )
}

export default Pagination
