const express = require('express');
const helmet = require('helmet');
const router = require('./routes');
const SQLCon = require('./config/SQLCon');

// Express-session setup. Don't forget to start the redis server.
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const client = redis.createClient();

const port = 3000;
const app = express();

client.on('ready', () => console.log('Connected to Redis.'));
client.on('error', (err) => console.log(err));

SQLCon.initCon()
  .then((message) => {
    console.log(message);

    app.use(helmet());
    app.use(session({
      store: new RedisStore({ client }),
      name: 'sid',
      saveUninitialized: false,
      resave: false,
      secret: 'mySuperDuperSecret',
      cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        sameSite: true,
        secure: false
      }
    }));

    // x-www-form-urlencoded parsing.
    app.use(express.urlencoded({extended: true}));

    app.use(express.static('assets'));
    app.use(router);
    app.listen(3000, () => {
      console.log(`Express server listening on port ${port}.`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });