import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers, typeDefs } from "./graphSchema/merged";
import jwt from 'jsonwebtoken';
import { config } from "./config/config";
import { AuthRepositoryPrisma } from "./repository/authRepository";

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const authRepository = new AuthRepositoryPrisma();

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },

    // context is function that runs for every request, used it to handle authentication
    context: async ({ req }) => {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.replace("Bearer ", "");
      let user = null;

      try {
        if (token) {
          const payload = jwt.verify(token, config.JWT_SECRET || "secret");
          
          if (typeof payload === 'object' && payload !== null && 'email' in payload) {
            user = await authRepository.findByEmail((payload as { email: string }).email);
          }
        }
      } catch (err) {
        console.warn("Invalid token");
      }

      return { user }; // will be available inside all resolvers
    },
  });

  console.log(`🚀 Server ready at ${url}`);
})();