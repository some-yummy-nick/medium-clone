import React, {useContext, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import {CurrentUserContext} from 'contexts/currentUser'
import useFetch from 'hooks/useFetch'
import Loading from 'components/Loading/Loading'
import ErrorMessage from 'components/ErrorMessage/ErrorMessage'
import {formatDate} from 'utils'

export const Comments = ({slug}) => {
  const [commentId, setCommentId] = useState('')
  const apiUrl = `articles/${slug}/comments/${commentId}`
  const [currentUserState] = useContext(CurrentUserContext)
  const [
    {
      isLoading: fetchCommentsIsLoading,
      response: fetchCommentsResponse,
      errors: fetchCommentsError,
    },
    doFetchGetComments,
  ] = useFetch(apiUrl)
  const [body, setBody] = useState('')

  const [{response: postCommentResponse}, doPostComment] = useFetch(apiUrl)
  const [{response: deleteCommentResponse}, doDeleteComment] = useFetch(apiUrl)

  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false)
  const [isSuccessfulDelete, setIsSuccessfulDelete] = useState(false)

  useEffect(() => {
    doFetchGetComments()
    setIsSuccessfulSubmit(false)
    setIsSuccessfulDelete(false)
  }, [doFetchGetComments, isSuccessfulSubmit, isSuccessfulDelete])

  useEffect(() => {
    if (!postCommentResponse) return
    setIsSuccessfulSubmit(true)
    setBody('')
  }, [postCommentResponse])

  useEffect(() => {
    if (!deleteCommentResponse) return
    setIsSuccessfulDelete(true)
    setCommentId('')
  }, [deleteCommentResponse])

  const handleSubmit = e => {
    e.preventDefault()
    doPostComment({
      method: 'POST',
      data: {
        comment: {body},
      },
    })
  }

  const handleDelete = id => {
    setCommentId(id)
    doDeleteComment({method: 'delete'})
  }

  // if (isSuccessfulSubmit) {
  //   setIsSuccessfulSubmit(false)
  // }
  //
  // if (isSuccessfulDelete) {
  //   setIsSuccessfulDelete(false)
  // }

  return (
    <>
      {fetchCommentsIsLoading && <Loading />}
      {fetchCommentsError && <ErrorMessage />}
      {currentUserState.isLoggedIn && (
        <>
          <form className="card comment-form" onSubmit={handleSubmit}>
            <fieldset>
              <div className="card-block">
                <textarea
                  className="form-control"
                  cols="30"
                  rows="8"
                  value={body}
                  onChange={e => setBody(e.target.value)}
                />
              </div>
              <div className="card-footer">
                <img
                  src={currentUserState.currentUser.image}
                  alt=""
                  className="comment-author-img"
                />
                <button className="btn btn-sm btn-primary" type="submit">
                  Post Comment
                </button>
              </div>
            </fieldset>
          </form>
          {!fetchCommentsIsLoading &&
            fetchCommentsResponse &&
            fetchCommentsResponse.comments.map(comment => (
              <div className="card" key={`comment-${comment.id}`}>
                <div className="card-block">
                  <div className="card-text">{comment.body}</div>
                </div>
                <div className="card-footer">
                  <Link
                    to={`/profiles/${comment.author.username}`}
                    className="comment-author"
                  >
                    <img
                      src={comment.author.image}
                      alt=""
                      className="comment-author-img"
                    />
                    &nbsp;
                    {comment.author.username}
                  </Link>
                  <span className="date-posted">
                    {formatDate(comment.createdAt)}
                  </span>
                  {comment.author.username ===
                    currentUserState.currentUser.username && (
                    <span className="mod-options">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(comment.id)}
                      >
                        <i className="ion-trash-a" style={{marginLeft: '0'}} />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            ))}
        </>
      )}
    </>
  )
}

export default Comments
