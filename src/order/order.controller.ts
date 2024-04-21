import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderItemDto } from './dto/update-order.dto';
import { CreateOrderItemDto } from './dto/create-orderItem.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}



  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }


  @UseGuards(JwtAuthGuard)
  @Post(':id')
  createOrderItem(@Param('id', ParseUUIDPipe) id: string,@Body() createOrderItemDto: CreateOrderItemDto, ) {
    return this.orderService.createOrderItem(id, createOrderItemDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }


  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderService.update(id, updateOrderItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.removeOrder(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/item/:id')
  removeItem(@Param('id') id: string) {
    return this.orderService.removeOrderItem(id);
  }
}
