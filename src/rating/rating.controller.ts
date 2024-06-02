import { Body, Controller, Delete, Get, Param, Post, Query, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { RatingService } from "./rating.service";
import { RateSellerDto } from "./dto/rate.seller.dto";
import * as jwt from 'jsonwebtoken';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { PaginationDto } from "../common/dtos/pagination.dto";
import { Roles } from "src/auth/decorators/role-auth.decorator";
import { UserRole } from "src/user/entities/user.entity";

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
    
    @Get('/author/:id')
    getGivenRatings(@Param('id') id: string){
        return this.ratingService.getGivenRatings(id);
    }

    @Get('/seller/:id')
    getReceivedRatings(@Param('id') id: string){
        return this.ratingService.getReceivedRatings(id);
    }

    @UseGuards(JwtAuthGuard)
    @Roles(UserRole.ADMIN)
    @Delete(':id')
    deleteRating(@Param('id') id: string){
        return this.ratingService.deleteRating(id);
    }

    private getUserIdFromRequest(@Req() request: Request): string {
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            throw new UnauthorizedException('Authorization header is missing');
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded['id'];
        } catch (error) {
            throw new UnauthorizedException();
        }
    }


}