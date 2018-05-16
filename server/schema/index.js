import { makeExecutableSchema } from "graphql-tools";

import RootEntity from "../entities";

export default database => makeExecutableSchema(RootEntity(database));
