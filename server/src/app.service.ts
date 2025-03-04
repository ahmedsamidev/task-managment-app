import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getPort(): string {
    return this.configService.get<string>('PORT') as string;
  }

  getDatabaseUrl(): string {
    return this.configService.get<string>('MONGODB_URI') as string;
  }

  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV') as string;
  }

  getJwtExpires(): string {
    return this.configService.get<string>('JWT_EXPIRES') as string;
  }

  getLinkedInUsername(): string {
    return this.configService.get<string>('LINKEDIN_USERNAME') as string;
  }

  getLinkedInPassword(): string {
    return this.configService.get<string>('LINKEDIN_PASSWORD') as string;
  }
}
