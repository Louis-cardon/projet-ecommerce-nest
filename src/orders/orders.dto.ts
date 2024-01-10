import { IsNumber, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class OrderProductDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsNumber()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  products: OrderProductDto[];
}

export class UpdateOrderDto {
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderProductDto)
    products?: OrderProductDto[];
  }