import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import express from "express";
import bodyParser from "body-parser";
import path from "path";

import config from "./config";
import schema from "./schema";

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

//////////////////////////////////////////////////
/**
 * PASS IMAGES AND OTHER STATIC STUFF
 */
//////////////////////////////////////////////////
// server.use(express.static(path.resolve(__dirname, "../build")));

//////////////////////////////////////////////////
/**
 * HANDLE CORS
 */
//////////////////////////////////////////////////
server.use((req, res, next) => {
  const allowedOrigins = [
    "https://guarded-plateau-76604.herokuapp.com",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://johannaochville.se"
  ];

  if (allowedOrigins.indexOf(req.headers.origin) !== -1) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,application/json, Accept"
  );
  next();
});

//////////////////////////////////////////////////
/**
 * PASS CLIENT DATA FROM EACH ROUTE
 */
//////////////////////////////////////////////////
// server.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../build", "index.html"));
// });

//////////////////////////////////////////////////
/**
 * SET UP GRAPHQL
 */
//////////////////////////////////////////////////

// Setup GraphQL
server.use(
  config.apiPath,
  graphqlExpress(req => ({
    schema: schema()
  }))
);

// Setup Graphiql IDE
server.use(
  config.graphiqlPath,
  graphiqlExpress({
    endpointURL: config.apiPath
  })
);

server.listen(PORT, () => {
  console.log(`Lyssnar på port ${PORT}`);
});
