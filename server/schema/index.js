import { makeExecutableSchema } from "graphql-tools";

import RootEntity from "../entities";

export default () => makeExecutableSchema(RootEntity());
