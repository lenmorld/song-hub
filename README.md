# Song-hub

Half-mini Spotify clone, half-song CRUD app. Login with Spotify for user profile access,
Spotify playlists and full songs playback. Node web server and REST API, MongoDB Atlas cloud database. Deployed in a Heroku dyno.

## Live demo

https://songhubapp.herokuapp.com/

## Features

- Login with Spotify
- View and playback playlists in Spotify
- Search songs with playback, and add to favorites
- Add, Edit, and Delete favorites

## Screens

![Songhub 1](https://pbs.twimg.com/media/EpEnEoLWEAAQqK3?format=jpg&name=4096x4096)

![Songhub 2](https://pbs.twimg.com/media/EpEnf2nXMAU66Zo?format=jpg&name=4096x4096)

![Songhub 3](https://pbs.twimg.com/media/EpEoc9jW8AIoH3T?format=jpg&name=4096x4096)

![Songhub 4](https://pbs.twimg.com/media/EpEoenxXYAAzdJu?format=jpg&name=4096x4096)

## Built with

- React
- Node + Express
- Spotify API
- Heroku

# Usage 

## Dev

run both server and client:
```
npm run dev
```
This uses concurrently to "watch" both client and server files.
Access them at:
- node server on http://localhost:3000/
- webpack dev server on http://localhost:4000/

run only server
```
npm run dev:server
```

run only client
```
npm run dev:client
```

## ENV variables

Supply the necessary environment variables.

```bash
cp .env.example .env
```

```bash
DEV_MODE_CLIENT=false
NODE_ENV=development
PORT=3000
MONGO_DB_CONNECTION_STRING=
SECRET_KEY=
SPOTIFY_API_KEY=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
HEROKU_URL=
```

**`DEV_MODE`**

`DEV_MODE=true` allows webpack dev server to run with a sample user
for non-login related work


## Build

Webpack build is run by Heroku on deploy.
To run build manually:

```
npm run build
```

Output goes to `src/`
See `webpack.config.js` for all build config.

## Deploy

The app is deployed on Heroku through git.

```
git add .
git commit -m "describe changes"
git push origin master
git push heroku master
```

A custom build script is provided to Heroku on deploy

```
"heroku-postbuild": "webpack --progress"
```

```
# builds ui once (no watch), and run server in watch mode
npm run build && npm run dev:server
```

For more info:
[Heroku - deploying with Git](https://devcenter.heroku.com/articles/git)

# License

[MIT](https://choosealicense.com/licenses/mit/)

# Contribution

Pull requests are welcome for any improvements or issues. For major changes, please open an issue first to discuss what you would like to change.
