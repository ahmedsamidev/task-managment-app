import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET') as string;

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const token: string = req.cookies?.['token'] as string; // Extract token from cookie
          if (token) {
            // Append token to Authorization header if it exists
            req.headers.authorization = `Bearer ${token}`;
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  validate(payload: { id: string; email: string }) {
    return { _id: payload.id, email: payload.email };
  }
}
