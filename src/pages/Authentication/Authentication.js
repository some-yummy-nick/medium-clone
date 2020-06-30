import React from 'react'
import {Link} from 'react-router-dom'

export const Authentication = () => (
  <div className="container page">
    <div className="row">
      <div className="col-md-6 offset-md-3 col-xs-12">
        <h1 className="text-xs-center">Login</h1>
        <p className="text-xs-center">
          <Link to="/register">Need an account?</Link>
        </p>
        <form>
          <fieldset>
            <fieldset className="form-group">
              <input
                type="email"
                placeholder="Email"
                className="form-control form-control-lg"
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="form-control form-control-lg"
              />
            </fieldset>
            <button
              type="submit"
              className="btn btn-lg btn-primary pull-xs-right"
            >
              Sign in
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
)

export default Authentication
