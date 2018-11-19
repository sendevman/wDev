require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');
const app = express();
const helpers = require('./src/config/helpers');
const userRouter = require('./src/routes/user');
const documentRouter = require('./src/routes/document');
const teamRouter = require('./src/routes/team');

const port = process.env.PORT || 8000;
const publicPath = path.join(__dirname, '../../public');
// Middlewares
app.use(busboy());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(busboyBodyParser());

//Routes
app.use('/api/user', userRouter);
app.use('/api/document', documentRouter);
app.use('/api/team', teamRouter);

app.get('*', (req, res, next) => {
  if (req.url.includes('api')) return next();
  res.sendFile(path.resolve(publicPath, 'index.html'));
});

app.use((req, res, next) => {
  next(createError(404));
});
app.use((err, req, res, next) => {
  console.log('err.status :', err.status);
  res.status(err.status || 500).json({
    message: 'An error has ocurred.',
    data: req.app.get('env') === 'development' ? err : null
  });
});
helpers.initApp();

app.listen(port, _ => console.log(`The server is listening on port ${port}`));