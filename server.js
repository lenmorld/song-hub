// import config file
const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config')

const server = express()
const port = config.port || 3000

// import routers and mount
const songsRouter = require('./routes/songs')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const meRouter = require('./routes/me') // 3L endpoints for current user

server.set('view engine', 'ejs')

server.use(bodyParser.json()) // parse JSON (application/json content-type)

server.use('/', authRouter)

// REST API routes for UI
// match with UI webpack dev server at webpack.config.js
server.use('/api', songsRouter)
server.use('/api', usersRouter)
server.use('/api', meRouter)

// static folder - put this after all routes
// so public/index.html doesn't override views/ folder served by routes
// https://stackoverflow.com/questions/25166726/express-serves-index-html-even-when-my-routing-is-to-a-different-file
server.use(express.static(`${__dirname}/public`))

server.listen(port, () => {
  console.log(`Server listening at ${port}`)
})
