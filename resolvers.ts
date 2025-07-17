import { Role } from "@prisma/client";
import { UserRepositoryPrisma } from "./repository/userRepository"
import { UserService } from "./services/user/userService";
import { idValidation, roleValidation } from "./validation/userValidation";

const userRepository = new UserRepositoryPrisma();
const userService = new UserService(userRepository);

export const resolvers = {
    Query: {
        viewAllUsers: async() => {
            return userService.viewAllUsers();
        },

        viewUserProfile: async(parent: any, args: {id: string}) => {
            const ID = idValidation.parse(args.id);
            return userService.viewUserProfile(ID);
        }
    },

    Mutation: {
        updateUserRole: async(parent: any, args: {id: string, role: Role}) => {
            const id = idValidation.parse(args.id);
            const role = roleValidation.parse(args.role);
            return await userService.updateUserRole(id, role);
        },

        deleteUser: async(parent: any, args: {id: string}) => {
            const id = idValidation.parse(args.id);
            return await userService.deleteUser(id);
        }
    }
}