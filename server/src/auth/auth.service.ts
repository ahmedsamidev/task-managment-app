import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ScraperService } from 'src/scraper/scraper.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly scraperService: ScraperService,
  ) {}

  async hashPassword(password: string) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async signUp({ email, password, linkedInUrl }: CreateUserDto) {
    const hashedPassword = await this.hashPassword(password);

     let linkedInProfile = {};
     if (linkedInUrl) {
       linkedInProfile =
         await this.scraperService.scrapeLinkedInProfile(linkedInUrl);
     }

   

    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      linkedInUrl,
       linkedInProfile,
    });
    return newUser.save();
  }

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('User not found. Please sign up.');
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    return user;
  }

  createToken(user: User) {
    return this.jwtService.sign({ id: user._id, email: user.email });
  }
}
