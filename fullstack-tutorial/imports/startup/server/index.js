import { ApolloServer, gql } from 'apollo-server-express';
import { WebApp } from 'meteor/webapp';

const typeDefs = gql`
  type Query {
    hi: String
  }
`;

const resolvers = {
  Query: {
    hi() {
      return 'Hello from the backend';
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql',
});

WebApp.connectHandlers.use('/graphql', (req, res) => {
  if (req.method === 'GET') {
    res.end();
  }
});
