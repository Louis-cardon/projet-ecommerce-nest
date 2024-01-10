import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto, UpdateOrderDto } from './orders.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: {
        orders_products: {
          include: {
            product: true, 
          }
        }
      }
    });
  }
  

  async findOne(id: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id: Number(id) },
      include: {
        orders_products: {
          include: {
            product: true, 
          }
        }
      }
    });
  
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  
    return order;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.prisma.order.create({
      data: {
        userId: createOrderDto.userId,
        orders_products: {
          create: createOrderDto.products.map(prod => ({
            product: {
              connect: { id: prod.productId },
            },
            quantity: prod.quantity,
          })),
        },
      },
    });
  }
  

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.prisma.orders_products.deleteMany({
      where: { orderId: Number(id) },
    });

    const updatedOrder = await this.prisma.order.update({
      where: { id: Number(id) },
      data: {
        orders_products: {
          createMany: {
            data: updateOrderDto.products.map(p => ({
              productId: p.productId,
              quantity: p.quantity,
            })),
          },
        },
      },
    });

    return updatedOrder;
  }

  async remove(id: string): Promise<Order> {
    return this.prisma.order.delete({ where: { id: Number(id) } });
  }
}
