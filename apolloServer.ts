import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers, typeDefs } from "./graphSchema/merged";
// import { typeDefs } from "./apolloSchema";
// import { resolvers } from "./resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
  });

  console.log(`🚀 Server ready at ${url}`);
})();