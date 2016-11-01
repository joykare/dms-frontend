const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./server/routes');
const config = require('./config/config');
const router = express.Router();
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.dev.js');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

require('./config/db');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}


app.use('/api', routes(router));

app.listen(config.port,  function(err){
  if (err){
    console.log('Port not reached: ', err);
  } else {
    console.log('Magic port right here localhost:', config.port);
  }
});

module.exports = app;
