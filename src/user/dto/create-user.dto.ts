import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches } from "@nestjs/class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
    
    @IsEnum(UserRole, {each:true})
    readonly roles: UserRole[];
}

