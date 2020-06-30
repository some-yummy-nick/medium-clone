import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export const Authentication = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('data ', email, password)
    setIsSubmitting(true)
  }
  useEffect(() => {
    if (!isSubmitting) {
      return
    }
    axios('https://conduit.productionready.io/api/users/login', {
      method: 'post',
      data: {
        user: {
          email: 'se@gh.ru',
          password: 'jh',
        },
      },
    })
      .then((res) => {
        console.log('success ', res)
        setIsSubmitting(false)
      })
      .catch((error) => {
        console.log('error ', error)
        setIsSubmitting(false)
      })
  })

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
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control form-control-lg"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control form-control-lg"
                />
              </fieldset>
              <button
                type="submit"
                className="btn btn-lg btn-primary pull-xs-right"
                disabled={isSubmitting}
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
