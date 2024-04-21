import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from '@nestjs/class-validator';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
