import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(userData: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = { ...userData, password: hashedPassword };
    return this.prisma.user.create({ data: newUser });
  }

  async update(id: string, userData: User): Promise<User> {
    let updatedUser = userData;
    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      updatedUser = { ...userData, password: hashedPassword };
    }
    return this.prisma.user.update({
      where: { id: Number(id) },
      data: updatedUser,
    });
  }

  async remove(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id: Number(id) } });
  }

  async findOneByUsername(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
