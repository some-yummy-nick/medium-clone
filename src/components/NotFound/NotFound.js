import React from 'react'
import {Link, useLocation} from 'react-router-dom'

export const NotFound = () => (
  <>
    <h1>
      Страница <code>{useLocation().pathname}</code> не найдена
    </h1>
    <p>
      Вернуться на <Link to="/">главную страницу</Link>
    </p>
  </>
)

export default NotFound
