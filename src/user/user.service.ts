import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './entities/user.entity';
import {v4 as uuid} from 'uuid';
@Injectable()
export class UserService {
  private users : User[] =[];

  async create(createUserDto: CreateUserDto) {
    const pass = await bcrypt.hash(createUserDto.password,10);
    var roleEnum;
    if (createUserDto.role === 'seller'){
      roleEnum = UserRole.SELLER;
    }else if(createUserDto.role === 'buyer'){
      roleEnum = UserRole.BUYER;
    }else{
      roleEnum = UserRole.ADMIN;
    }
    const user : User = {
      id: uuid(),
      email : createUserDto.email,
      password : pass,
      role : roleEnum,
      slug: createUserDto.slug,
      createdAt:  new Date().getTime()
    }
    this.users.push(user);

    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
