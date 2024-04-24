import { IsNotEmpty, IsArray, ArrayNotEmpty, ArrayMinSize, IsDate, IsNumber, IsInt, Min, IsUUID, IsString } from "@nestjs/class-validator";
import { Column } from 'typeorm';
import { CreateOrderItemDto } from "./create-orderItem.dto";

export class CreateOrderDto {
  @IsNotEmpty()
  @Column('timestamp',
  {nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  orderDate: Date;

  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  items: CreateOrderItemDto[];
}
