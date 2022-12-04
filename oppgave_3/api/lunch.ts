import fetcher from '../lib/fetch'

const BASE_URL = '/api'
const EMPLOYEES_URL = `${BASE_URL}/employees`

export const getLunch = (options: any) => {
  return fetcher('/api/demo', {
    method: 'GET',
    ...options,
  })
}

export const getPoll = (id: string, options: any) => {
  return fetcher(`${POLLS_URL}/${id}`, {
    method: 'GET',
    ...options,
  })
}

export const createPoll = (data: any, options: any) => {
  return fetcher(POLLS_URL, {
    method: 'POST',
    ...options,
    body: JSON.stringify(data),
  })
}

export const updatePoll = (id: string, data: any, options: any) => {
  return fetcher(POLLS_URL, {
    method: 'POST',
    ...options,
    body: JSON.stringify(data),
  })
}