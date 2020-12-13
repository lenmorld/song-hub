import React from 'react'
import ReactDOM from 'react-dom'

import Fetchy from './Fetchy'
import Header from './Header'
import SongsHome from './SongsHome'
import Login from './Login'

// allow webpack-dev-server to skip login
// useful for just working on non-login related UI
const DEV_MODE_CLIENT = process.env.DEV_MODE_CLIENT === 'true'

const DEV_MODE_USER = {
  display_name: 'Lenny',
  email: 'lenmorld@gmail.com',
  external_urls: {
    spotify: 'https://open.spotify.com/user/3wytubqe8gdcanop7i7hnzlom',
  },
  followers: { href: null, total: 6 },
  href: 'https://api.spotify.com/v1/users/3wytubqe8gdcanop7i7hnzlom',
  id: '3wytubqe8gdcanop7i7hnzlom',
  images: [
    {
      height: null,
      width: null,
      url:
        'https://scontent-atl3-1.xx.fbcdn.net/v/t31.0-1/p320x320/19787107_10209699780711449_8185009963243246747_o.jpg?_nc_cat=106&ccb=2&_nc_sid=0c64ff&_nc_ohc=DqI3FumxzL8AX_ceZSR&_nc_ht=scontent-atl3-1.xx&tp=6&oh=706626f35281c3c167d45d5dc0c6a11b&oe=5FF95DB4',
    },
  ],
  type: 'user',
  uri: 'spotify:user:3wytubqe8gdcanop7i7hnzlom',
}

// import './styles.css'

// NOTE: window.user comes from index.ejs
// FIXME: use SSR instead to inject this server-side
// and just hydrate the frontend

const App = () => {
  let user
  try {
    user = JSON.parse(window.user)
  } catch (e) {
    user = null // not logged in yet
  }

  if (DEV_MODE_CLIENT && !user) {
    user = DEV_MODE_USER
  }

  // TODO: implement as context instead
  return (
    <div className="container">
      {!user && <Login authorizationUrl={window.auth_url} />}
      {user && (
        <>
          <Header user={user} />
          <SongsHome user={user} />
        </>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

// SSR
// ReactDOM.hydrate(<App />, document.getElementById('root'))
