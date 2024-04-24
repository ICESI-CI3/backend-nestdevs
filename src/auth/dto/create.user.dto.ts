import { IsEmail, IsOptional, IsString, Matches, MaxLength, Min, MinLength } from "@nestjs/class-validator";

export class CreateUserDto{
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsString()
    @MinLength(3)
    fullName: string;
    @IsString()
    readonly role: string;
    @IsString()
    @IsOptional()
    readonly slug: string;
}