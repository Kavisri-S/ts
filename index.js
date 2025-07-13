const express = require('express');
const parser = require('body-parser');
const connectDb = require('./dbconfig');
const ticket = require('./ticket');
const auth = require('./auth');

const app = express();
connectDb();

app.use(parser.json());
app.use('/ticket', ticket);
app.use('/auth', auth);

app.listen(3000, () => {
  console.log("Ticketing system running on");
});