import { gql } from 'apollo-server'

//Schema
const typeDefs = gql`
  type Query {
    users: [User]
    quotes: [QuoteWithName]
    # we identify the user by their ID
    user(id: ID!): User
    iquote(by: ID!): [Quote]
  }

  type QuoteWithName {
    name: String
    by: IdName
  }

  type IdName {
    _id: String
    firstName: String
  }

  #User type
  type User {
    _id: ID!
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
    signupUser(userNew: UserInput!): User
  }

  type Mutation {
    signupUser(userNew: UserInput!): User
    signinUser(userSignin: UserSigninInput!): Token
    createQuote(name: String!): String
  }

  type Token {
    token: String
  }
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input UserSigninInput {
    email: String!
    password: String!
  }
`
export default typeDefs
