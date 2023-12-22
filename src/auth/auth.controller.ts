import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() loginDto: any) { // Remplacez 'any' par un DTO approprié
    return this.authService.signIn(loginDto.email,loginDto.password);
  }

  // Vous pouvez ajouter d'autres méthodes comme signup, logout, etc.
}
