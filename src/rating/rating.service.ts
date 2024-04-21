import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Query } from "@nestjs/common";
import { RateSellerDto } from "./dto/rate.seller.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Rating } from "./model/rating.entity";
import { Repository } from "typeorm";
import {v4 as uuid} from 'uuid';
import { User } from "src/user/entities/user.entity";
import { PaginationDto } from "src/common/dtos/pagination.dto";

@Injectable()
export class RatingService{


    constructor(
        @InjectRepository(Rating)
        private readonly ratingRepository:Repository<Rating>,
        @InjectRepository(User)
        private readonly userRepository:Repository<User>,
    ){}

    async create(rateDto:RateSellerDto,userId:string){

        const {sellerId,...rateData} = rateDto

        const user = this.userRepository.findOneBy({
            id:sellerId
        })

        if ( !user ) throw new NotFoundException(`Seller with id: ${ sellerId } not found`);


        const rating = this.ratingRepository.create({
            ...rateData,
            sellerId:sellerId,
            authorId:userId,
            id:uuid()
        });
        
        try{
            await this.ratingRepository.save(rating);
            return rating;
        }catch(error){
            this.handleDBErrors(error)
        }
    } 

    
    async findAll(@Query() paginationDto:PaginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        return this.ratingRepository.find({
            take: limit,
            skip: offset,
            relations:{
            }
          })
    }

    async getSellerRating(id: string) {



        const ratings =  this.ratingRepository.findBy({
            sellerId:id
        });

        console.log(ratings)
    }

    private handleDBErrors( error: any ): never {

        if ( error.code === '23505' ) 
          throw new BadRequestException( error.detail );
    
        console.log(error)
    
        throw new InternalServerErrorException('Please check server logs');
    
    }
}