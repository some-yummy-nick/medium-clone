import React from 'react'
import {NavLink} from 'react-router-dom'

export const FeedToggler = ({tagName}) => (
  <div className="feed-toggle">
    <ul className="nav nav-pills outline-active">
      <li className="li nav-item">
        <NavLink className="nav-link" to="/feed">
          Your feed
        </NavLink>
      </li>
      <li className="li nav-item">
        <NavLink className="nav-link" to="/" exact>
          Global feed
        </NavLink>
      </li>
      {tagName && (
        <li className="li nav-item">
          <NavLink className="nav-link" to={`tags/${tagName}`}>
            <i className="ion-pound" />
            {tagName}
          </NavLink>
        </li>
      )}
    </ul>
  </div>
)

export default FeedToggler
