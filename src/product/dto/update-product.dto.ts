import { IsOptional, IsString, IsUUID, IsNumber } from "@nestjs/class-validator";

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

    @IsNumber()
    @IsOptional()
    readonly price?: number;

    @IsUUID()
    @IsOptional()
    readonly sellerId?: string;
}
