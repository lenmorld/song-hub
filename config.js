// init. and expose environment variables for SERVER
// for UI side, it's on webpack.config.js using Dotenv-webpack
const dotenv = require('dotenv')

dotenv.config()
if (!process.env.PORT) {
  console.error('*****.env file missing! See README.md *****')
} else {
  console.log(`*****ENV PORT: ${process.env.PORT} *****`)
  console.log(`*****ENV NODE_ENV: ${process.env.NODE_ENV} *****`)
}

module.exports = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo_db_connection_string: process.env.MONGO_DB_CONNECTION_STRING,
  spotify_client_id: process.env.SPOTIFY_CLIENT_ID,
  spotify_client_secret: process.env.SPOTIFY_CLIENT_SECRET,
  heroku_url: process.env.HEROKU_URL,
}
