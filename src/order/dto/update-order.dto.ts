import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { CreateOrderItemDto } from './create-orderItem.dto';
import { IsInt, Min } from '@nestjs/class-validator';

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
    @IsInt()
    @Min(1)
    quantity?: number;
}
