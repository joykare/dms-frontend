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

const env = process.env.NODE_ENV;
if (env === 'development') {
  dotenv.load();
}

require('./config/db');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', routes(router));

if (env === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      hash: true,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));
  app.use(require('webpack-hot-middleware')(compiler));
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/client/index.html'));
  });
} else if(env == 'production') {
  app.use(express.static(path.join(__dirname, '/client/dist')));
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/client/dist/index.html'));
  });
}



app.listen(config.port,  function(err){
  if (err){
    console.log('Port not reached: ', err);
  } else {
    console.log('Magic port right here localhost:', config.port);
  }
});

module.exports = app;
