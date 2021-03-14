// Complete your server here!
// Do NOT `server.listen()` inside this file!
const express = require('express');
const server = express();
const { logger } = require('./middleware/middleware');

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

// Teach Express to Parse json
server.use(express.json());

server.use('/api/actions', logger, actionsRouter)
server.use('/api/projects', logger, projectsRouter);

// catch all error response
server.use((err, req, res, next) => {//eslint-disable-line
    res.status(500).json({
      message: err.message,
      stack: err.stack,
      custom: "You hit the catch-all error message. You didn't hit any proper endpoints."
    })
  });


module.exports = server;
