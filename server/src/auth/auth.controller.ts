import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/Login.dto';
import { AppService } from 'src/app.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private appService: AppService,
  ) {}

  @Post('signUp')
  signUp(@Body() userData: CreateUserDto) {
    return this.authService.signUp(userData);
  }

  @Post('login')
  async login(
    @Body() { email, password }: LoginDto,
    @Res() response: Response,
  ) {
    const user = await this.authService.validateUser(email, password);
    const token = this.authService.createToken(user);

    response.cookie('token', token, {
      httpOnly: true,
      secure: this.appService.getNodeEnv() === 'production',
      maxAge: Number(this.appService.getJwtExpires()),
      sameSite: 'strict',
    });

    return response.status(200).json({
      message: 'Login successful!',
      user: user,
    });
  }

  @Post('logout')
  logout(@Res() res: Response) {
    // Clear the authentication cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Logged out successfully' });
  }
}
