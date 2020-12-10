# TEMP: 

DEV_MODE allows webpack-dev-server to run with default user
for non-login related work

```
# watches ui changes
npm run dev:client
```

Login-related work/server-driven dev

```
# builds ui once (no watch), and run server in watch mode
npm run build && npm run dev:server
```

### OLD

# Dev on both

```bash
# runs concurrently to "watch" both client/ and server/
npm run dev
```

# Frontend (client UI)

```bash
cd client/
# runs webpack-dev-server on 4000
npm start
```

# Backend (server)

```bash
cd server/
# runs nodemon server/index.js on 3000
npm run dev
```