import React, {useEffect, useState, useContext} from 'react'
import {Redirect} from 'react-router-dom'
import {CurrentUserContext} from 'contexts/currentUser'
import useFetch from 'hooks/useFetch'
import ArticleForm from 'components/ArticleForm/ArticleForm'

export const CreateArticle = () => {
  const initialValues = {title: '', description: '', body: '', tagList: []}
  const [currentUserState] = useContext(CurrentUserContext)
  const apiUrl = 'articles'
  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false)
  const [{response, errors}, doFetch] = useFetch(apiUrl)
  const onSubmit = article => {
    doFetch({
      method: 'POST',
      data: {article},
    })
  }
  useEffect(() => {
    if (!response) {
      return
    }
    setIsSuccessfulSubmit(true)
  }, [response])

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to="/" />
  }

  if (isSuccessfulSubmit) {
    return <Redirect to={`/articles/${response.article.slug}`} />
  }

  return (
    <>
      <ArticleForm
        onSubmit={onSubmit}
        errors={(errors && errors.errors) || {}}
        initialValues={initialValues}
      />
    </>
  )
}

export default CreateArticle
