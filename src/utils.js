import {parse} from 'query-string'

import {LIMIT} from './constants'

export const range = (start, end) =>
  [...Array(end).keys()].map(el => el + start)

export const getPaginator = search => {
  const parsedSearch = parse(search)
  const currentPage = parsedSearch.page ? Number(parsedSearch.page) : 1
  const offset = currentPage * LIMIT - LIMIT
  return {currentPage, offset}
}

export const formatDate = date => {
  const newDate = new Date(date)

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }

  return newDate.toLocaleString('en', options) // среда, 31 декабря 2014 г. 12:30:00
}
