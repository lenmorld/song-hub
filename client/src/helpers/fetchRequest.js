// this matches dev-server config in webpack.config.js
const SERVER_PREFIX = '/api'

const fetchRequest = async (endpoint, options = { method: 'GET' }) => {
  const raw = await fetch(`${SERVER_PREFIX}${endpoint}`, {
    method: options.method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
    body: options.body && JSON.stringify(options.body),
  })

  const data = raw.json()

  if (data.error) {
    console.error(data.error)
  }
  return data
}

export default fetchRequest
