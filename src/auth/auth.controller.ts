import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() loginDto: any) { 
    return this.authService.signIn(loginDto.email,loginDto.password);
  }

  @Post('signinadmin')
  @HttpCode(HttpStatus.OK)
  async signInAdmin(@Body() loginDto: any) { 
    return this.authService.signInAdmin(loginDto.email,loginDto.password);
  }
}
