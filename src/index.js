import http from 'http';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import api from './api';
import config from './config.json';

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

app.use(bodyParser.json({
  limit: config.bodyLimit
}));

app.all('/api/*', function (req, res, next) {
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': 130,
    'Expires': -1,
    'Pragma': 'no-cache',
    'Strict-Transport-Security': 'max-age=15552000; includeSubDomains; preload',
    'Vary': 'Accept-Encoding',
    'X-Content-Type-Options': 'nosniff'
  });
  next(); // pass control to the next handler
});


// api router
app.use('/api', api({ config }));

app.server.listen(process.env.PORT || config.port, () => {
  console.log(`Started on port ${app.server.address().port}`);
});

export default app;
