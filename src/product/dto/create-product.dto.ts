
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested, isString } from "@nestjs/class-validator";
import { CreateUserDto } from "src/auth/dto/create.user.dto";
import { User } from "src/user/entities/user.entity";
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

  @IsEnum(ProductCategory)
  @IsString()
  readonly category: ProductCategory;

  @IsString()
  readonly sellerId : string;

}