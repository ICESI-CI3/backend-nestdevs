import { IsNotEmpty, IsOptional, IsString } from "@nestjs/class-validator";

export class CreateCurrentUserDto {
    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    readonly lastName: string;
}