import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './entities/user.entity';
import {v4 as uuid} from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class UserService {
  private users : User[] =[];
  private readonly logger = new Logger('UserService');
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

  findAll( paginationDto: PaginationDto ) {

    const { limit = 10, offset = 0 } = paginationDto;

    return this.userRepository.find({
      take: limit,
      skip: offset,
      relations:{
        products : true,
        orders: true,
      }
    })
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id: id });
  }

  async update(req:any, id: string, updateUserDto: UpdateUserDto) {
    const requser = req.user as User;
    const user: User = await this.userRepository.findOneBy({id:id})
    if (requser.id==user.id||user.roles.includes(UserRole.ADMIN)){
      const user = await this.userRepository.preload({
        id: id,
        ...updateUserDto
      });

      if ( !user ) throw new NotFoundException(`User with id: ${ id } not found`);

      try {
        await this.userRepository.save( user );
        return user;
        
      } catch (error) {
        this.handleDBExceptions(error);
      }
      return `This action updates a #${id} user`;
    }else{
      throw new UnauthorizedException;
    }
  }
  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

  async remove(req:any, id: string) {
    const requser = req.user as User;
    const user: User = await this.userRepository.findOneBy({id:id})
    if (requser.id==user.id||user.roles.includes(UserRole.ADMIN)){
      const user = await this.findOne(id)
      await this.userRepository.remove(user);
    }else{
      throw new UnauthorizedException;
    }
  }

  private handleDBErrors( error: any ): never {


    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    console.log(error)

    throw new InternalServerErrorException('Please check server logs');

  }

}
