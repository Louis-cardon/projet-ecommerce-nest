import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service'; 

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY = process.env.JWT_SECRET;

  constructor(private prisma: PrismaService) {} 

  async signIn(email: string, password: string): Promise<string> {

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.email, sub: user.id };
    return jwt.sign(payload, this.JWT_SECRET_KEY, { expiresIn: '1h' });
  }

  async signInAdmin(email: string, password: string): Promise<string> {

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.email, sub: user.id, roles:[ 'admin']};
    return jwt.sign(payload, this.JWT_SECRET_KEY, { expiresIn: '1h' });
  }

}
