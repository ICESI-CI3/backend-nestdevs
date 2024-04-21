import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderItemDto } from './dto/update-order.dto';
import { CreateOrderItemDto } from './dto/create-orderItem.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/role-auth.decorator';
import { UserRole } from 'src/user/entities/user.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}



  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN,UserRole.BUYER)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }


  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN,UserRole.BUYER)
  @Post(':id')
  createOrderItem(@Param('id', ParseUUIDPipe) id: string,@Body() createOrderItemDto: CreateOrderItemDto, ) {
    return this.orderService.createOrderItem(id, createOrderItemDto);
  }


  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN,UserRole.SELLER,UserRole.BUYER)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }


  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN,UserRole.SELLER,UserRole.BUYER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }


  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN,UserRole.BUYER)
  @Patch(':id')
  update(@Req() req: any,@Param('id') id: string, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderService.update(req,id, updateOrderItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN,UserRole.BUYER)
  @Delete(':id')
  remove(@Req() req:any,@Param('id') id: string) {
    return this.orderService.removeOrder(req,id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN,UserRole.BUYER)
  @Delete('/item/:id')
  removeItem(@Req() req:any, @Param('id') id: string) {
    return this.orderService.removeOrderItem(req, id);
  }
}
