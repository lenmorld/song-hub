import React from 'react'

const Login = ({ authorizationUrl }) => {
  return (
    <div>
      <a href={authorizationUrl}>Login</a>
    </div>
  )
}

export default Login
