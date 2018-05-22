import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import express from "express";
import bodyParser from "body-parser";
import mongoDB from "mongodb";
import path from "path";
import cors from "cors";
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
server.use(express.static(path.resolve(__dirname, "../build")));

//////////////////////////////////////////////////
/**
 * HANDLE CORS
 */
//////////////////////////////////////////////////
server.use(cors());

//////////////////////////////////////////////////
/**
 * PASS CLIENT DATA FROM EACH ROUTE
 */
//////////////////////////////////////////////////
server.get(/^(?!.*(graphiql|api)).*$/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});

//////////////////////////////////////////////////
/**
 * SET UP GRAPHQL
 */
//////////////////////////////////////////////////
mongoDB.MongoClient.connect(
  "mongodb://ville:villelabbarmongo@ds159459.mlab.com:59459/dashboard",
  { useNewUrlParser: true },
  (err, client) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    const database = client.db("dashboard");

    // Setup GraphQL
    server.use(
      config.apiPath,
      graphqlExpress(req => ({
        schema: schema(database)
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
      console.log(`Lyssnar på port ${PORT} och ansluten till mongoDB`);
    });
  }
);
