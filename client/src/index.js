import React from 'react'
import ReactDOM from 'react-dom'

import Fetchy from './Fetchy'
import SongsHome from './SongsHome'

// import './styles.css'

// TODO: implement LOGIN
const user = {
  id: 0,
}

const App = () => (
  <div className="container">
    <SongsHome user={user} />
    {/* <Fetchy /> */}
  </div>
)

ReactDOM.render(<App />, document.getElementById('app'))
