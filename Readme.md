```js
//server.js
import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

import typeDefs from './schemaGql.js'
import resolvers from './resolvers.js'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})

server.listen().then(({ url }) => {
  console.log(`🚀Server ready at ${url}`)
})
```

```js
//schemaGql.js
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
```

```js
//resolvers.js
import { quotes, users } from './fakedb.js'
import { randomBytes } from 'crypto'
const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(user => user.id == id),
    quotes: () => quotes,
    iquote: (_, { by }) => quotes.filter(quote => quote.by == by),
  },

  User: {
    quotes: ur => quotes.filter(quote => quote.by == ur.id),
  },

  Mutation: {
    signupUserDummy: (_, { userNew }) => {
      const id = randomBytes(5).toString('hex')
      users.push({
        id,
        ...userNew,
      })
      return users.find(user => user.id == id)
    },
  },
}

export default resolvers
```

# ``4)Mutation,Input Type and Aliases``

```js
//schemaGql.js

type Mutation {
    signupUserDummy(userNew: UserInput!): User
  }
  
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }



//resolvers.js
const resolvets={
      Mutation: {
     signupUserDummy: (_, { userNew }) => {
      const id = randomBytes(5).toString('hex')
      users.push({
        id,
        ...userNew,
      })
      return users.find(user => user.id == id)
    },
  },
}


//Client query
localhost:4000
-------
mutation createUser($userNew:UserInput!){
  user:signupUserDummy(userNew:$userNew){ 
    id
    email
    firstName
    lastName
  }
}

{
  "userNew": {
    "firstName": "navin",
    "lastName": "ssd",
    "email": "sdsad@sd.com",
    "password": "12345"
  }
}
------

```

# ``5)Add MongoDB and creating Model``

```js
// Connect to MongoDB
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('databse connected...')
  })
  .catch(err => console.log(err))

  
//import models here
import './models/User.js'
import './models/Quote.js'
import resolvers from './resolvers.js'

```