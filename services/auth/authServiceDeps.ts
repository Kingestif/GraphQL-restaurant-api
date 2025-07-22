import { HashRepository } from '../../repository/hashRepository';
import { TokenRepository } from '../../repository/tokenRepository';
import { IAuthRepository } from '../../repository/authRepository';

export interface AuthServiceDeps {
  userRepository: IAuthRepository;
  hashRepository: HashRepository;
  tokenRepository: TokenRepository;
}
