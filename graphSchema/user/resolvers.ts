import { Role } from "@prisma/client";
import { UserRepositoryPrisma } from "../../repository/userRepository";
import { UserService } from "../../services/user/userService";
import { idValidation, roleValidation } from "../../validation/userValidation";
import signupValidation from "../../validation/signupValidation";
import { AuthenticationService } from "../../services/auth/authService";
import { AuthRepositoryPrisma } from "../../repository/authRepository";
import { BcryptHashRepository } from "../../repository/hashRepository";
import { JwtTokenRepository } from "../../repository/tokenRepository";
import { config } from '../../config/config';
import signInValidation from "../../validation/signinValidation";
import { requireAuth } from "../../utils/checkRole";

const AuthDeps = () => {
    return {
        userRepository: new AuthRepositoryPrisma(),  
        hashRepository: new BcryptHashRepository(),
        tokenRepository: new JwtTokenRepository(
            config.JWT_SECRET,      
            Number(config.JWT_EXPIRE) 
        )
    }
};
const userRepository = new UserRepositoryPrisma();
const userService = new UserService(userRepository);
const authenticationService = new AuthenticationService(AuthDeps());

export const userResolvers = {
    Query: {
        signUp: async(parent: any, args: {input: {email: string, password: string, role: string}}) => {
            const input = signupValidation.parse(args.input);
            return await authenticationService.signUp(input); 
        },

        login: async(parent: any, args: {input: {email: string, password: string}}) => {
            const input = signInValidation.parse(args.input);
            return await authenticationService.signIn(input);
        },

        viewAllUsers: async(parent: any, args: any, context:any) => {
            requireAuth(context, ['admin']);
            return userService.viewAllUsers();
        },

        viewUserProfile: async(parent: any, args: {id: string}, context:any) => {
            requireAuth(context, ['admin']);
            const ID = idValidation.parse(args.id);
            return userService.viewUserProfile(ID);
        }
    },

    Mutation: {
        updateUserRole: async(parent: any, args: {id: string, role: Role}, context:any) => {
            requireAuth(context, ['admin']);
            const id = idValidation.parse(args.id);
            const role = roleValidation.parse(args.role);
            return await userService.updateUserRole(id, role);
        },

        deleteUser: async(parent: any, args: {id: string}, context:any) => {
            requireAuth(context, ['admin']);
            const id = idValidation.parse(args.id);
            return await userService.deleteUser(id);
        }
    }
}