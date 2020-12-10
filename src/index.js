import React from 'react'
import ReactDOM from 'react-dom'

import Fetchy from './Fetchy'
import Header from './Header'
import SongsHome from './SongsHome'
import Login from './Login'

// import './styles.css'

// NOTE: window.user comes from index.ejs
// FIXME: use SSR instead to inject this server-side
// and just hydrate the frontend

// TODO: implement LOGIN
// debugger;
// const user = {
//   id: 0,
// }

/*
{
  display_name: "Lenny"
  email: "lenmorld@gmail.com"
  external_urls: {spotify: "https://open.spotify.com/user/3wytubqe8gdcanop7i7hnzlom"}
  followers: {href: null, total: 6}
  href: "https://api.spotify.com/v1/users/3wytubqe8gdcanop7i7hnzlom"
  id: "3wytubqe8gdcanop7i7hnzlom"
  images: [{…}]
  type: "user"
  uri: "spotify:user:3wytubqe8gdcanop7i7hnzlom"
}
*/

const App = () => {
  let user
  try {
    user = JSON.parse(window.user)
  } catch (e) {
    user = null // not logged in yet
  }

  // TODO: implement as context instead
  return (
    <div className="container">
      {!user && <Login authorizationUrl={window.auth_url} />}
      {user && (
        <>
          <Header />
          <SongsHome user={user} />
        </>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

// SSR
// ReactDOM.hydrate(<App />, document.getElementById('root'))
