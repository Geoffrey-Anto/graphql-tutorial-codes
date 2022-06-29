import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    getUsers: [User]
  }

  type Mutation {
    addUser(input: UserDetails): User
    changeUserAddress(id: String!, city: String!,state: String!, pincode: Int!): Boolean
    addPostToUser(id: String!, title: String!, image: String!): Boolean
  }

  input UserDetails {
    name: String!
    gender: String!
    age: Int!
    city: String!
    state: String! 
    pincode: Int! 
    image: String! 
    title: String!
  }

  type Address {
    city: String!
    state: String!
    pincode: Int!
  }

  type Post {
    image: String!
    title: String!
  }

  type User {
    name: String!
    gender: String!
    age: Int!
    address: Address!
    posts: [Post]
  }
`;

export default typeDefs;
