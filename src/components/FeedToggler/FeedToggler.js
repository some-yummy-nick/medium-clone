import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {CurrentUserContext} from '../../contexts/currentUser'

export const FeedToggler = ({tagName}) => {
  const [currentUserState] = useContext(CurrentUserContext)

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {currentUserState.isLoggedIn && (
          <li className="li nav-item">
            <NavLink className="nav-link" to="/feed">
              Your feed
            </NavLink>
          </li>
        )}
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
}

export default FeedToggler
