const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./controllers/users');
const config = require('./config/config');

mongoose.connect(config.MONGO_DB_URL, {  useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });


app.use(cors(
  {
    origin: config.FRONTEND_URL,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
))

// parse application/json (fetch)
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