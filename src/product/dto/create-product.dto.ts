
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested, isString } from "@nestjs/class-validator";
import { CreateUserDto } from "src/auth/dto/create.user.dto";
import { User } from "src/user/entities/user.entity";

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

  @IsString()
  readonly sellerId : string;

}