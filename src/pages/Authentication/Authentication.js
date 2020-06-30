import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import useFetch from '../../hooks/useFetch'

export const Authentication = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [{isLoading, response, errors}, doFetch] = useFetch('users/login')
  const handleSubmit = e => {
    e.preventDefault()
    doFetch({
      method: 'post',
      data: {
        user: {
          email: 'se@gh.ru',
          password: 'jh',
        },
      },
    })
  }

  return (
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Login</h1>
          <p className="text-xs-center">
            <Link to="/register">Need an account?</Link>
          </p>
          <form onSubmit={handleSubmit}>
            <fieldset>
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
                Sign in
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Authentication
