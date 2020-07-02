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
