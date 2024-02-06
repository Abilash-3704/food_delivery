require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT;
const mongo = process.env.MONGO_URI;

const userRoute = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/api/users', userRoute);
mongoose
  .connect(mongo)
  .then(() => {
    app.listen(port, () => console.log(`listening on port ${port}`));
  })
  .catch(error => {
    console.log(error);
  });
