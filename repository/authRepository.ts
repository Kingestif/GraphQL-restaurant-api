import { Role } from '@prisma/client';
import prisma from '../prisma';
import { Usertype } from "../types/user";
import { AppError } from '../utils/AppError';
import { toUser } from '../mapper/toUserType';

// This interface describes what our repository must do, but not how. 
// My business logic (service/use case) will depend on this interface.
export interface IAuthRepository {
    findByEmail(email: string): Promise<Usertype | null>;
    save(user: Usertype): Promise<Usertype>;
}

export class AuthRepositoryPrisma implements IAuthRepository {
    async findByEmail(email: string): Promise<Usertype | null> {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(!user) return null;
        
        return {
            id: user.id.toString(),
            email: user.email,
            password: user.password,
            role: user.role as Role
        }
    }
    
    async save(user: Usertype): Promise<Usertype> {
        if (!user.password) {
            throw new AppError("Missing required field password", 400);
        }

        const newuser = await prisma.user.create({
            data: {
                email: user.email,
                password: user.password,
                role: user.role as Role
            }
        });

        return toUser(newuser);
    }
}