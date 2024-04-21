import { IsOptional, IsString, Length } from "@nestjs/class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
    @IsString()
    readonly email: string;
    @IsString()
    readonly password: string;
    @IsString()
    readonly role: string;
    @IsString()
    @IsOptional()
    readonly slug: string;
}
