import { UserRepositoryPrisma } from "./repository/userRepository"
import { UserService } from "./services/user/userService";

const userRepository = new UserRepositoryPrisma();
const userService = new UserService(userRepository);

export const resolvers = {
    Query: {
        viewAllUsers: async() => {
            return userService.viewAllUsers();
        },

        viewUserProfile: async(parent: any, args: {id: string}) => {
            return userService.viewUserProfile(args.id);
        }
    }
}