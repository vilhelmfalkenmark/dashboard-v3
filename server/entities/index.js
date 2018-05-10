import { makeExecutableSchema } from "graphql-tools";

const people = {
  hej: (id = 1) => {
    return JSON.stringify({ name: "ville", id: 4 });
  }
};

const typeDefs = `
  type Person {
    id: Int!
    name: String
  }
  
 input personId {
    id: Int!
  }

  type Query {
    person(params: personId): Person
  }`;

const resolvers = {
  Query: {
    person: (context, { params: { id } }) => people.hej(id)
  }
};

export const schema = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers
});

export default schema;
