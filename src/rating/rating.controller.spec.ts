import { Test, TestingModule } from '@nestjs/testing';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { RateSellerDto } from './dto/rate.seller.dto';
import * as faker from 'faker';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { Rating } from './model/rating.entity';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../auth/dto/create.user.dto';
import { UserController } from '../user/user.controller';

describe('RatingController', () => {
  let controller: RatingController;
  let ratingService: RatingService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingController,UserController],
      providers: [
        RatingService,
        UserService,
        {
          provide: RatingService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            getSellerRating: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            create: jest.fn(), 
          },
        },
      ],
    }).compile();

    controller = module.get<RatingController>(RatingController);
    ratingService = module.get<RatingService>(RatingService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create rating', () => {
    it('should create a rating', async () => {
      
      const fakerateDto: RateSellerDto = {
        sellerId: faker.datatype.uuid(),
        description: faker.lorem.sentence(),
        stars: faker.datatype.number({ min: 1, max: 5 }),
      };

      /*
      const createUserDto: CreateUserDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'buyer',
        slug: faker.lorem.slug(),
      };*/
      

      const userId = faker.datatype.uuid();

      const createdRating: Rating = {
        id: faker.datatype.uuid(),
        description: fakerateDto.description,
        stars: fakerateDto.stars,
        sellerId: fakerateDto.sellerId,
        authorId: userId,
        seller: new User(),
        author: new User(),
      };

      const request: any = {
        headers: {
          authorization: 'Bearer ' + createMockToken(userId),
        },
      };
      
      console.log("REQUEEEEEEEEST ");
      console.log(request);
      jest.spyOn(ratingService, 'create').mockResolvedValue(createdRating);

      expect(await controller.create(fakerateDto, request)).toBe(createdRating);
    });
  });
});

function createMockToken(userId: any): string {
  const secret = 'icesi_marketplace'; 
  
  const payload = {
    id: userId
  };

  const token = jwt.sign(payload, secret, { expiresIn: '2h' });
  console.log("PROCES.ENV.JWTTTTTTTTTTT");
  console.log(process.env.JWT_SECRET);
  console.log("JWT VERIFYYYYYYYYYY")
  console.log(jwt.verify(token, 'icesi_marketplace'))
  
  return token;
}
