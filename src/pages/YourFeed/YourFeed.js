import React, {useEffect} from 'react'
import useFetch from '../../hooks/useFetch'
import {stringify} from 'query-string'
import Feed from 'components/Feed/Feed'
import Pagination from 'components/Pagination/Pagination'
import PopularTags from 'components/PopularTags/PopularTags'
import Loading from 'components/Loading/Loading'
import ErrorMessage from 'components/ErrorMessage/ErrorMessage'
import FeedToggler from 'components/FeedToggler/FeedToggler'
import {getPaginator} from '../../utils'
import {LIMIT} from '../../constants'

export const YourFeed = ({location, match}) => {
  const {currentPage, offset} = getPaginator(location.search)
  const stringifiedParams = stringify({
    limit: LIMIT,
    offset,
  })
  const url = match.url
  const apiUrl = `articles/feed?${stringifiedParams}`
  const [{isLoading, response, errors}, doFetch] = useFetch(apiUrl)
  useEffect(() => {
    doFetch()
  }, [doFetch, currentPage])
  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
            {isLoading && <Loading />}
            {errors && <ErrorMessage />}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={LIMIT}
                  url={url}
                  currentPage={currentPage}
                />
              </>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  )
}

export default YourFeed
