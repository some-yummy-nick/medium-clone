import React, {useContext, useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import {CurrentUserContext} from 'contexts/currentUser'
import useFetch from 'hooks/useFetch'
import useLocalStorage from 'hooks/useLocalStorage'
import BackendErrorMessages from 'components/BackendErrorMessages/BackendErrorMessages'

export const Settings = () => {
  const [currentUserState, dispatch] = useContext(CurrentUserContext)
  const apiUrl = 'user'
  const [{response, errors}, doFetch] = useFetch(apiUrl)
  const [image, setImage] = useState('')
  const [bio, setBio] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [, setToken] = useLocalStorage('token')
  const [isSuccessfulLogout, setIsSuccessfulLogout] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    doFetch({
      method: 'put',
      data: {
        user: {
          ...currentUserState.currentUser,
          image,
          username,
          bio,
          email,
          password,
        },
      },
    })
  }

  const logout = e => {
    e.preventDefault()
    setToken('')
    dispatch({type: 'LOGOUT'})
    setIsSuccessfulLogout(true)
  }

  useEffect(() => {
    if (!currentUserState.currentUser) return
    setImage(currentUserState.currentUser.image)
    setUsername(currentUserState.currentUser.username)
    setEmail(currentUserState.currentUser.email)
    setBio(currentUserState.currentUser.bio)
  }, [currentUserState.currentUser])

  useEffect(() => {
    if (!response) return
    dispatch({type: 'SET_AUTHORIZED', payload: response.user})
  }, [response, dispatch])

  if (isSuccessfulLogout) {
    return <Redirect to="/" />
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your settings</h1>
            {errors && <BackendErrorMessages backendErrors={errors.errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    placeholder="URL of profile picture"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    className="form-control form-control-lg"
                    placeholder="Short bio about you"
                  />
                </fieldset>
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
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button className="btn btn-outline-danger" onClick={logout}>
              Or click here to logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
