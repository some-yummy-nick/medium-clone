import React from 'react'
import classNames from 'classnames'

import useFetch from 'hooks/useFetch'

export const AddToFavorite = ({isFavorited, favoritesCount, articleSlug}) => {
  const apiUrl = `articles/${articleSlug}/favorite`
  const [{response}, doFetch] = useFetch(apiUrl)
  const favoritesCountWithResponse = response
    ? response.article.favoritesCount
    : favoritesCount
  const isFavoritedWithResponse = response
    ? response.article.favorited
    : isFavorited
  const handleLike = e => {
    e.preventDefault()
    doFetch({
      method: isFavoritedWithResponse ? 'delete' : 'post',
    })
  }
  const buttonClasses = classNames('btn btn-sm', {
    'btn-primary': isFavoritedWithResponse,
    'btn-outline-primary': !isFavoritedWithResponse,
  })

  return (
    <button className={buttonClasses} onClick={handleLike}>
      <i className="ion-heart" />
      <span>&nbsp;{favoritesCountWithResponse}</span>
    </button>
  )
}

export default AddToFavorite
