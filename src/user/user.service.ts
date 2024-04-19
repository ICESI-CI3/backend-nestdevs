import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './entities/user.entity';
import {v4 as uuid} from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  private users : User[] =[];

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto) {
    try{
      const {password,...userData} = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password : bcrypt.hashSync(password, 10),
        id : uuid()
      });
      
      await this.userRepository.save(user);
      delete user.password;

      return user;

    }catch(error){
      this.handleDBErrors(error);
    }
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.filter(user => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return this.users.filter(user=> user.id !== id);
  }





  private handleDBErrors( error: any ): never {


    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }

}
