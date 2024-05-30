
import { IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested, isString } from "@nestjs/class-validator";
import { ProductCategory } from "../model/product.entity";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsEnum(ProductCategory, {each:true})
  readonly category: ProductCategory;

  @IsString()
  readonly sellerId : string;

  @IsString()
  readonly image: string;
}