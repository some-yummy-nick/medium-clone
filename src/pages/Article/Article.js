import React, {useContext, useEffect, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'

import {CurrentUserContext} from 'contexts/currentUser'
import useFetch from 'hooks/useFetch'
import Loading from 'components/Loading/Loading'
import ErrorMessage from 'components/ErrorMessage/ErrorMessage'
import TagList from 'components/TagList/TagList'

export const Article = ({match}) => {
  const [currentUserState] = useContext(CurrentUserContext)
  const slug = match.params.slug
  const apiUrl = `articles/${slug}`
  const [
    {
      isLoading: fetchArticleIsLoading,
      response: fetchArticleResponse,
      errors: fetchArticleError,
    },
    doFetch,
  ] = useFetch(apiUrl)
  const [{response: deleteArticleResponse}, doDeleteArticle] = useFetch(apiUrl)
  const [isSuccessfulDelete, setIsSuccessfulDelete] = useState(false)

  const isAuthor = () => {
    if (!fetchArticleResponse || !currentUserState.isLoggedIn) return false
    return (
      fetchArticleResponse.article.author.username ===
      currentUserState.currentUser.username
    )
  }
  useEffect(() => {
    doFetch()
  }, [doFetch])

  useEffect(() => {
    if (!deleteArticleResponse) return
    setIsSuccessfulDelete(true)
  }, [deleteArticleResponse])

  const deleteArticle = () => {
    doDeleteArticle({
      method: 'delete',
    })
  }

  if (isSuccessfulDelete) {
    return <Redirect to="/" />
  }
  return (
    <div className="article-page">
      <div className="banner">
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="container">
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className="article-meta">
              <Link
                to={`/profiles/${fetchArticleResponse.article.author.username}`}
              >
                <img src={fetchArticleResponse.article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link
                  to={`/profiles/${fetchArticleResponse.article.author.username}`}
                  className="author"
                >
                  {fetchArticleResponse.article.author.username}
                </Link>
                <span className="date">
                  {fetchArticleResponse.article.createdAt}
                </span>
              </div>
              {isAuthor() && (
                <>
                  <span>
                    <Link
                      className="btn btn-outline-secondary btn-sm"
                      to={`/articles/${slug}/edit`}
                      style={{marginRight: '5px'}}
                    >
                      <i className="ion-edit" style={{marginRight: '5px'}} />
                      Edit article
                    </Link>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={deleteArticle}
                    >
                      <i className="ion-trash-a" style={{marginRight: '5px'}} />
                      Delete article
                    </button>
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {fetchArticleIsLoading && <Loading />}
        {fetchArticleError && <ErrorMessage />}
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div>
                <p>{fetchArticleResponse.article.body}</p>
              </div>
              <TagList tags={fetchArticleResponse.article.tagList} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Article
