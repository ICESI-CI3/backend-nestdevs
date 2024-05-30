import { IsOptional, IsString, IsUUID, IsNumber, IsEnum } from "@nestjs/class-validator";
import { ProductCategory } from "../model/product.entity";

export class UpdateProductDto {
    
    @IsUUID()
    @IsOptional()
    readonly id?: string;

    @IsString()
    @IsOptional()
    readonly name?: string;

    @IsEnum(ProductCategory)
    @IsOptional()
    readonly category?: ProductCategory;
    
    @IsString()
    @IsOptional()
    readonly description?: string;

    @IsNumber()
    @IsOptional()
    readonly price?: number;


    @IsUUID()
    @IsOptional()
    readonly sellerId?: string;

    @IsOptional()
    @IsString()
    readonly image?: string;
}
