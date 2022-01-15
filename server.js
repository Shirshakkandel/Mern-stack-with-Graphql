import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
//mongodb+srv://shirshak:%40info123@cluster0.anmrj.mongodb.net/graphql?retryWrites=true&w=majority
import typeDefs from './schemaGql.js'
import mongoose from 'mongoose'
import { MONGO_URL } from './config.js'

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

// Create the GraphQL server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})
// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀Server ready at ${url}`)
})
