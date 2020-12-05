import React from 'react'
import ReactDOM from 'react-dom'

import Fetchy from './Fetchy'
import Songs from './Songs'

// import './styles.css'

const App = () => (
  <div>
    <Songs />
    {/* <Fetchy /> */}
  </div>
)

ReactDOM.render(<App />, document.getElementById('app'))
