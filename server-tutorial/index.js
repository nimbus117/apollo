const { ApolloServer, gql } = require("apollo-server");

const libraries = [
  {
    branch: "downtown",
  },
  {
    branch: "riverside",
  },
];

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
    branch: ["riverside", "downtown"],
  },
  {
    title: "Harry Potter and the Goblet of Fire",
    author: "J.K. Rowling",
    branch: ["riverside"],
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
    branch: ["downtown"],
  },
];

const typeDefs = gql`

  type Library {
    branch: String!
    books: [Book!]
  }

  type Book {
    title: String!
    author: Author!
    branch: [String!]
  }

  type Author {
    name: String
    books: [Book!]
  }

  type Query {
    libraries: [Library]
    authors: [Author]
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    libraries() {
      return libraries;
    },
    authors() {
      return [...new Set(books.map((book) => book.author))].map((author) => ({
        name: author,
      }));
    },
    books() {
      return books;
    },
  },
  Library: {
    books(parent) {
      return books.filter((book) => book.branch.includes(parent.branch));
    },
  },
  Book: {
    author(parent) {
      return {
        name: parent.author,
      };
    },
  },
  Author: {
    books(parent) {
      return books.filter((book) => book.author === parent.name);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers, tracing: true });
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
