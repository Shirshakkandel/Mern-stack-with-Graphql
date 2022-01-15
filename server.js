import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
//mongodb+srv://shirshak:%40info123@cluster0.anmrj.mongodb.net/graphql?retryWrites=true&w=majority
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
