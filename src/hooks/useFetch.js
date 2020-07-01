import {useEffect, useState} from 'react'
import axios from 'axios'

export default url => {
  const baseUrl = 'https://conduit.productionready.io/api/'
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [errors, setErrors] = useState(null)
  const [options, setOptions] = useState({})

  const doFetch = (options = {}) => {
    setOptions(options)
    setIsLoading(true)
  }

  useEffect(() => {
    if (!isLoading) {
      return
    }
    axios(`${baseUrl + url}`, options)
      .then(res => {
        setResponse(res.data)
        setIsLoading(false)
      })
      .catch(error => {
        setErrors(error.response.data)
        setIsLoading(false)
      })
  }, [isLoading, options, url])

  return [{isLoading, response, errors}, doFetch]
}
