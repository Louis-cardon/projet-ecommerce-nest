import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { id: Number(id) } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(productData: Product): Promise<Product> {
    return this.prisma.product.create({ data: productData });
  }

  async update(id: string, productData: Product): Promise<Product> {
    return this.prisma.product.update({
      where: { id: Number(id) },
      data: productData,
    });
  }

  async remove(id: string): Promise<Product> {
    return this.prisma.product.delete({ where: { id: Number(id) } });
  }
}
