import { ApolloServer, gql } from "apollo-server";
import { Data, User } from "./Data";

const typeDefs = gql`
  type User {
    userId: Int!
    id: Int!
    title: String!
    body: String!
  }
  type Query {
    getUser(id: Int!): User
    getUsersBy_userId(userId: Int!): [User]!
  }
`;

const resolvers = {
  Query: {
    getUser: async (
      parent: any,
      args: { id: number },
      ctx: any,
      info: any
    ): Promise<User | null> => {
      const user = Data.find((data) => {
        if (data.id == args.id) {
          return data;
        }
      }) || null;
      console.log(user);
      return user;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Listening started at ${url}`);
});
