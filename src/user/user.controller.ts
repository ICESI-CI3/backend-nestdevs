import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UseGuards, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserRole } from './entities/user.entity';
import { Roles } from 'src/auth/decorators/role-auth.decorator';
import { CreateCurrentUserDto } from './dto/create-curren.user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @UsePipes(ValidationPipe)
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UsePipes(ValidationPipe)
  @Post('seller')
  registerSeller(@Body() createUserDto: CreateCurrentUserDto) {
    return this.userService.registerSeller(createUserDto);
  }

  @UsePipes(ValidationPipe)
  @Post('buyer')
  registerBuyer(@Body() createUserDto: CreateCurrentUserDto) {
    return this.userService.registerBuyer(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.userService.findAll(paginationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @Get(':id')
  findOne(@Req() req:any,@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN,UserRole.SELLER,UserRole.BUYER)
  @Patch(':id')
  update(@Req() req:any,@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req,id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN,UserRole.BUYER,UserRole.SELLER)
  @Delete(':id')
  remove(@Req() req:any,@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(req,id);
  }
}
