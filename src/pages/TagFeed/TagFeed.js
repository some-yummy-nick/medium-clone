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

export const TagFeed = ({location, match}) => {
  const tagName = match.params.slug
  const {currentPage, offset} = getPaginator(location.search)
  const stringifiedParams = stringify({
    limit: LIMIT,
    offset,
    tag: tagName,
  })
  const url = match.url
  const apiUrl = `articles?${stringifiedParams}`
  const [{isLoading, response, errors}, doFetch] = useFetch(apiUrl)
  useEffect(() => {
    doFetch()
  }, [doFetch, currentPage, tagName])
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
            <FeedToggler tagName={tagName} />
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

export default TagFeed
