const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./controllers/users');
const config = require('./config/node-config');

mongoose.connect(config.mongodbUrl, {  useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.post('/register', users.registerUser);

// handle 404
app.use((req, res, next) => {
  let err = new Error('Route Not Found');
  err.status = 404;
  next(err);
});

// development error handler
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
      console.log(err);
      res.status(err.status || 500).send();
  });
}

// production error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send();
});

app.listen(process.env.PORT || 3001, () => {
  console.log('listening on port 3001');
});