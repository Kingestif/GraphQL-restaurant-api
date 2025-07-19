import { HashRepository } from "../../repository/hashRepository";
import { TokenRepository } from "../../repository/tokenRepository";
import { IAuthRepository } from "../../repository/authRepository";
import { Usertype } from "../../types/user";
import { AppError } from "../../utils/AppError";
import { SignInValidationType } from "../../validation/signinValidation";
import { signUpValidationType } from "../../validation/signupValidation";
import { AuthServiceDeps } from "./authServiceDeps";

export class AuthenticationService {
    private userRepository: IAuthRepository;
    private hashRepository: HashRepository;
    private tokenRepository: TokenRepository;

    constructor(deps: AuthServiceDeps) {
        this.userRepository = deps.userRepository;
        this.hashRepository = deps.hashRepository;
        this.tokenRepository = deps.tokenRepository;
    }

    async signUp({ email, password, role }: signUpValidationType) {

        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new AppError("User with this email already exists", 401);
        }

        const hashedPassword = await this.hashRepository.hash(password, 12);

        const user: Usertype = {
            email,
            password: hashedPassword,
            role
        }

        const savedUser = await this.userRepository.save(user);

        // return new UserDTO(savedUser);
        return savedUser;
    }

    async signIn({ email, password }: SignInValidationType) {
        const existingUser = await this.userRepository.findByEmail(email);

        if (!existingUser || !existingUser.password || !await this.hashRepository.compare(password, existingUser.password)){
            throw new AppError('Incorrect email or password', 401);
        }

        const token = this.tokenRepository.generateToken({email: existingUser.email});

        return token;
    }
}