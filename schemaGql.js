import { gql } from 'apollo-server'

//Schema
const typeDefs = gql`
  type Query {
    users: [User]
    quotes: [Quote]
    # we identify the user by their ID
    user(id: ID!): User
    iquote(by: ID!): [Quote]
  }

  #User type
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    #1 one user may have multiole quotes at first it will be null
    quotes: [Quote]
  }

  #Quote type
  type Quote {
    name: String
    by: ID
  }

  type Mutation {
    signupUserDummy(userNew: UserInput!): User
  }
  
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
`
export default typeDefs
