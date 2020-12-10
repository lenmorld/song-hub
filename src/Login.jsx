import React from 'react'
import styled from '@emotion/styled'

const styles = {
  container: {
    width: '100%',
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
  },
  jumbo: {
    fontSize: '8vw',
  },
}

const LoginLink = styled.a`
  font-size: 2rem;
  display: inline-block;
  padding: 2rem 3rem;
  border-radius: 500px;
  color: white;
  border: none;

  margin-top: 2rem;

  background-color: green;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: limegreen;
  }
`

const Login = ({ authorizationUrl }) => {
  return (
    <div style={styles.container}>
      <div style={styles.jumbo}>
        Song
        <span style={{ color: 'white' }}>hub</span>
      </div>
      <div style={{ color: 'white' }}>'hub' your music</div>
      <div>
        <LoginLink href={authorizationUrl}>Login with Spotify</LoginLink>
      </div>
    </div>
  )
}

export default Login
