import { IsNumber, IsString } from "@nestjs/class-validator";

export class RateSellerDto{

    @IsString()
    readonly sellerId : string;

    @IsString()
    readonly description : string;

    @IsNumber()
    readonly starts : number;
    
}