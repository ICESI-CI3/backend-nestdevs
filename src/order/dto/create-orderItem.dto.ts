import { IsOptional, IsString } from '@nestjs/class-validator';
import { IsNotEmpty, IsInt, Min } from "@nestjs/class-validator";

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsOptional()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;
}