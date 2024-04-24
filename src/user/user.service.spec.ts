import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UnauthorizedException } from '@nestjs/common';
import { PaginationDto } from '../common/dtos/pagination.dto';

describe('UserService', () => {
  let service: UserService;
  let mockUserRepository: Partial<Record<keyof Repository<User>, jest.Mock>>;

  beforeEach(async () => {
    mockUserRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOneBy: jest.fn(),
      find: jest.fn(),
      preload: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('test_create_user_success', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      name: 'Test',
      lastName: 'User',
      password: 'password123',
      roles: [UserRole.SELLER]
    };
    const expectedUser = {
      ...createUserDto,
      id: 'uuid',
      password: undefined,
    };

    mockUserRepository.create.mockReturnValue({
      ...createUserDto,
      id: 'uuid',
      password: 'hashed',
    });
    mockUserRepository.save.mockResolvedValue(expectedUser);

    const result = await service.create(createUserDto);
    expect(result).toEqual(expectedUser);
    expect(result.password).toBeUndefined();
  });
  

  it('test_find_all_users_with_pagination', async () => {
    const paginationDto: PaginationDto = { limit: 5, offset: 10 };
    const users = [new User(), new User(), new User(), new User(), new User()];

    mockUserRepository.find.mockResolvedValue(users);

    const result = await service.findAll(paginationDto);
    expect(result).toHaveLength(5);
    expect(mockUserRepository.find).toHaveBeenCalledWith({
      take: 5,
      skip: 10,
      relations: {
        products: true,
        orders: true,
      },
    });
  });
});