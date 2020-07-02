import React, {useState, useEffect, useContext} from 'react'
import {Link, Redirect} from 'react-router-dom'
import useFetch from 'hooks/useFetch'
import useLocalStorage from 'hooks/useLocalStorage'
import {CurrentUserContext} from 'contexts/currentUser'
import BackendErrorMessages from 'components/BackendErrorMessages/BackendErrorMessages'

export const Authentication = props => {
  const isLogin = props.match.path === '/login'
  const title = isLogin ? 'Sign in' : 'Sign up'
  const url = isLogin ? 'users/login' : 'users'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false)
  const [{isLoading, response, errors}, doFetch] = useFetch(url)
  const [, setToken] = useLocalStorage('token')
  const [, dispatch] = useContext(CurrentUserContext)

  const handleSubmit = e => {
    e.preventDefault()
    const user = isLogin ? {email, password} : {username, email, password}
    doFetch({
      method: 'post',
      data: {user},
    })
  }

  useEffect(() => {
    if (!response) {
      return
    }
    setToken(response.user.token)
    setIsSuccessfulSubmit(true)
    dispatch({type: 'SET_AUTHORIZED', payload: response.user})
  }, [response, setToken, dispatch])

  if (isSuccessfulSubmit) {
    return <Redirect to="/" />
  }

  return (
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">{title}</h1>
          <p className="text-xs-center">
            {isLogin ? (
              <Link to="/register">Need an account?</Link>
            ) : (
              <Link to="/login">Have an account?</Link>
            )}
          </p>
          <form onSubmit={handleSubmit}>
            {errors && <BackendErrorMessages backendErrors={errors.errors} />}
            <fieldset>
              {!isLogin && (
                <fieldset className="form-group">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="form-control form-control-lg"
                  />
                </fieldset>
              )}
              <fieldset className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="form-control form-control-lg"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="form-control form-control-lg"
                />
              </fieldset>
              <button
                type="submit"
                className="btn btn-lg btn-primary pull-xs-right"
                disabled={isLoading}
              >
                {title}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Authentication
