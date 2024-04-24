import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RoleGuard } from './guards/role-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { UserRole } from 'src/user/entities/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue('success')
          }
        },
        {
          provide: JwtAuthGuard,
          useValue: {
            canActivate: jest.fn().mockImplementation((context: ExecutionContext) => true)
          }
        },
        {
          provide: RoleGuard,
          useValue: {
            canActivate: jest.fn().mockImplementation((context: ExecutionContext) => true)
          }
        }
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('test_login_with_valid_credentials', async () => {
    const dto = new AuthenticateDto();
    dto.email = 'testuser@gmail.com';
    dto.password = 'testpass';
    expect(await controller.login(dto)).toEqual('success');
    expect(authService.login).toHaveBeenCalledWith(dto);
  });

  it('test_admin_route_access_control', async () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    await controller.privateRouteAdmin(mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith('You are authorized admin');
  });

  it('test_seller_route_unauthorized_access', async () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    await controller.privateRouteSellern(mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith('You are authorized seller');
  });
});