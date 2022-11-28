const express = require('express');
const routes = require('./routes');
const connection = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
connection.sync({ alter: true });
console.log("All models were synchronized successfully.");

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
