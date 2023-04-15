const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
app.use(bodyParser.json());
// middleware function
const gqHttp = require("express-graphql").graphqlHTTP;
// othe imports
const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");

// to allow cross-origin data
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth); // a middleware

// We have only endpoint, "POST" method, which automatically looks for required data.
app.use(
  "/graphql",
  gqHttp({
    // we send a JS object to configure our graphQL API
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    // debugging GUI tool
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@dkcluster.5ycybzf.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
