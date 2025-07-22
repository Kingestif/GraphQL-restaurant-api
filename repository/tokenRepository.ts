import jwt from 'jsonwebtoken';

export interface TokenRepository {
  generateToken: (payload: object) => string;
}

export class JwtTokenRepository implements TokenRepository {
  private secret: string;
  private expiresIn: number;

  constructor(secret: string, expiresIn: number){
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }
}
