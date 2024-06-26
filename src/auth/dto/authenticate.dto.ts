import { IsEmail, IsNotEmpty, IsString } from "@nestjs/class-validator";

export class AuthenticateDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
    
}