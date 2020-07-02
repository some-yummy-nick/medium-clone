import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import Loading from 'components/Loading/Loading'
import ErrorMessage from 'components/ErrorMessage/ErrorMessage'

export const PopularTags = () => {
  const [{isLoading, response, errors}, doFetch] = useFetch('tags')
  useEffect(() => {
    doFetch()
  }, [doFetch])
  return (
    <>
      {isLoading && <Loading />}
      {errors && <ErrorMessage />}
      {!isLoading && response && (
        <div className="sidebar">
          <p>PopularTags</p>
          <div className="tag-list">
            {response.tags.map(tag => (
              <Link
                className="tag-default tag-pill"
                key={`tag-${tag}`}
                to={`/tags/${tag}`}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default PopularTags
