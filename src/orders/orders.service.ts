import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({ where: { id: Number(id) } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async create(orderData: Order): Promise<Order> {
    return this.prisma.order.create({ data: orderData });
  }

  async update(id: string, orderData: Order): Promise<Order> {
    return this.prisma.order.update({
      where: { id: Number(id) },
      data: orderData,
    });
  }

  async remove(id: string): Promise<Order> {
    return this.prisma.order.delete({ where: { id: Number(id) } });
  }
}
