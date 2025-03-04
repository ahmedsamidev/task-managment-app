import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';

import { AppService } from 'src/app.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ScraperService } from 'src/scraper/scraper.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AppService, JwtStrategy, ScraperService],
})
export class AuthModule {}
