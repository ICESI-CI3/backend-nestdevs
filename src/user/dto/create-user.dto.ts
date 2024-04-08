import { IsOptional, IsString, Length } from "@nestjs/class-validator";

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
