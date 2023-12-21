import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(userData: User): Promise<User> {
    return this.prisma.user.create({ data: userData });
  }

  async update(id: string, userData: User): Promise<User> {
    return this.prisma.user.update({
      where: { id: Number(id) },
      data: userData,
    });
  }

  async remove(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id: Number(id) } });
  }
}
