import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import {v4 as uuid} from 'uuid';
import { AuthenticateDto } from "./dto/authenticate.dto";
import { sign } from 'jsonwebtoken'
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./model/user";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "./dto/create.user.dto";


@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async register(createUserDto: CreateUserDto) {
        try{
            const {password,...userData} = createUserDto;
            const user = this.userRepository.create({
                ...userData,
                password: bcrypt.hashSync(password, 10)
            });

            console.log(user);
            await this.userRepository.save(user);
           
            delete user.password;

            return {
                ...user,
                token: this.jwtService.sign({id: user.id})
            };

        } catch (error) {
            this.handleDBErrors(error);
        }
    }

    async login(authenticateDto: AuthenticateDto) {

        const { email, password } = authenticateDto;

        const user = await this.userRepository.findOne({
            where: { email},
            select : {email: true, password: true,id: true}
        });


        if(!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        if(!bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return {
            ...user,
            token: this.jwtService.sign({id: user.id})
        };
    }


    private handleDBErrors(error: any) : never {
        if(error.code === '23505') {
            throw new BadRequestException(error.detail);
        }
        throw new UnauthorizedException('Please check your server logs');
    }

}