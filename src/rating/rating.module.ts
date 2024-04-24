import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Rating } from './model/rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { User } from '../user/entities/user.entity';

@Module({
    controllers : [RatingController],
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([Rating,User]),
    ],
    providers : [RatingService]
})
export class RatingModule {}
