// import config file
const express = require('express')
const body_parser = require('body-parser')
const config = require('./config')

// import routers and mount
const songsRouter = require('./routes/songs')
const usersRouter = require('./routes/users')

const server = express()

server.use(body_parser.json()) // parse JSON (application/json content-type)

// REST API routes for UI
// match with UI webpack dev server at webpack.config.js
server.use('/api', songsRouter)
server.use('/api', usersRouter)

const port = config.port || 3000

server.listen(port, () => {
  console.log(`Server listening at ${port}`)
})
