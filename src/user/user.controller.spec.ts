import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as Faker from 'faker';
import { User, UserRole } from './entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        email: Faker.internet.email(),
        name: Faker.name.firstName(),
        lastName: Faker.name.lastName(),
        password: Faker.internet.password(),
        roles: [UserRole.SELLER],
      };

      await controller.create(createUserDto);

      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should find all users', async () => {
      const paginationDto = { limit: 10, offset: 0 };

      await controller.findAll(paginationDto);

      expect(userService.findAll).toHaveBeenCalledWith(paginationDto);
    });
  });

  describe('findOne', () => {
    it('should find one user', async () => {
      const userId = Faker.datatype.uuid();
      const mockUser: User = {
        id: userId,
        email: Faker.internet.email(),
        name: Faker.name.firstName(),
        lastName: Faker.name.lastName(),
        password: Faker.internet.password(), 
        roles: [UserRole.BUYER],
        createdAt: Faker.date.past().getTime(), 
        products: [], 
        orders: [], 
        ratings: [], 
        ratingsGiven: [], 
        soldOrders: []
      };
      jest.spyOn(userService, 'findOne').mockResolvedValue(mockUser);
  
      const result = await controller.findOne({}, userId);
  
      expect(userService.findOne).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockUser);
    });
  
    it('should throw NotFoundException if user is not found', async () => {
      const userId = Faker.datatype.uuid();
      jest.spyOn(userService, 'findOne').mockRejectedValue(new NotFoundException());
  
      await expect(controller.findOne({}, userId)).rejects.toThrow(NotFoundException);
    });
  });
  
  
  

  describe('update', () => {
    it('should update a user', async () => {
      const userId = Faker.datatype.uuid();
      const updateUserDto: UpdateUserDto = {
        email: Faker.internet.email(),
        password: Faker.internet.password(),
        role: 'seller',
        slug: Faker.lorem.slug(),
      };

      await controller.update({}, userId, updateUserDto);

      expect(userService.update).toHaveBeenCalledWith({}, userId, updateUserDto);
    });

    it('should throw UnauthorizedException if user is not authorized', async () => {
      const userId = Faker.datatype.uuid();
      const updateUserDto: UpdateUserDto = {
        email: Faker.internet.email(),
        password: Faker.internet.password(),
        role: 'seller',
        slug: Faker.lorem.slug(),
      };
      jest.spyOn(userService, 'update').mockRejectedValue(new UnauthorizedException());

      await expect(controller.update({}, userId, updateUserDto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const userId = Faker.datatype.uuid();
      const updateUserDto: UpdateUserDto = {
        email: Faker.internet.email(),
        password: Faker.internet.password(),
        role: 'seller',
        slug: Faker.lorem.slug(),
      };
      jest.spyOn(userService, 'update').mockRejectedValue(new NotFoundException());

      await expect(controller.update({}, userId, updateUserDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const userId = Faker.datatype.uuid();

      await controller.remove({}, userId);

      expect(userService.remove).toHaveBeenCalledWith({}, userId);
    });

    it('should throw UnauthorizedException if user is not authorized', async () => {
      const userId = Faker.datatype.uuid();
      jest.spyOn(userService, 'remove').mockRejectedValue(new UnauthorizedException());

      await expect(controller.remove({}, userId)).rejects.toThrow(UnauthorizedException);
    });
  });
});
