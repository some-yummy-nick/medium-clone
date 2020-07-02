import React, {useEffect} from 'react'
import {stringify} from 'query-string'

import useFetch from 'hooks/useFetch'
import Loading from 'components/Loading/Loading'
import ErrorMessage from 'components/ErrorMessage/ErrorMessage'
import Feed from 'components/Feed/Feed'
import Pagination from 'components/Pagination/Pagination'

import {getPaginator} from 'utils'
import {LIMIT} from '../../constants'

const getApiUrl = ({username, offset, isFavorites}) => {
  const params = isFavorites
    ? {limit: LIMIT, offset, favorited: username}
    : {limit: LIMIT, offset, author: username}
  return `articles/?${stringify(params)}`
}
export const UserArticles = ({username, location, isFavorites, url}) => {
  const {currentPage, offset} = getPaginator(location.search)
  const apiUrl = getApiUrl({username, offset, isFavorites})
  const [{isLoading, response, errors}, doFetch] = useFetch(apiUrl)
  useEffect(() => {
    doFetch()
  }, [doFetch, isFavorites])

  return (
    <>
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
    </>
  )
}

export default UserArticles
