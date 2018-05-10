import { makeExecutableSchema } from "graphql-tools";

const people = {
  hej: (id = 1) => {
    console.log(id, "<-- id från graphql");
    return { name: "ville", id: 4 };
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

const hej = () => {
  const schema = makeExecutableSchema({
    typeDefs: [typeDefs],
    resolvers
  });

  return schema;
};

export default hej;
