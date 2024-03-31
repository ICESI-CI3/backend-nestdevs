import { IsOptional, IsString, IsUUID } from "@nestjs/class-validator";

export class UpdateProductDto {
    
    @IsUUID()
    @IsOptional()
    readonly id?: string;

    @IsString()
    @IsOptional()
    readonly name?: string;
    
    @IsString()
    @IsOptional()
    readonly description?: string;

    @IsString()
    @IsOptional()
    readonly price?: number;
}
