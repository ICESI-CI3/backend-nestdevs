import { Body, Controller, Get, Param, Post, Query, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { RatingService } from "./rating.service";
import { RateSellerDto } from "./dto/rate.seller.dto";
import * as jwt from 'jsonwebtoken';
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { PaginationDto } from "src/common/dtos/pagination.dto";

@Controller('rating')
export class RatingController{

    constructor(private readonly ratingService:RatingService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() rateDto:RateSellerDto,@Req() request: Request){
        const userId = this.getUserIdFromRequest(request)
        return this.ratingService.create(rateDto,userId)
    }

    @Get()
    findAll(@Query() paginationDto:PaginationDto){
        return this.ratingService.findAll(paginationDto);
    }

    @Get(':id')
    getSellerRating(@Param('id') id: string){
        return this.ratingService.getSellerRating(id);
    }


    private getUserIdFromRequest(@Req() request:Request){
        const authHeader  = request.headers['authorization']
        const token = authHeader.split(' ')[1];
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            return decoded['id']
        }catch(error){
            throw new UnauthorizedException()
        }
    }


}