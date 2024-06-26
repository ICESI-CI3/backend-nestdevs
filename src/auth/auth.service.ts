import {Injectable, UnauthorizedException } from "@nestjs/common";
import {v4 as uuid} from 'uuid';
import { AuthenticateDto } from "./dto/authenticate.dto";
import { sign } from 'jsonwebtoken'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { User } from "../user/entities/user.entity";


@Injectable()
export class AuthService {


    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}


    async login(authenticateDto: AuthenticateDto) {

        const {email, password} = authenticateDto;

        const user = await this.userRepository.findOne({
            where : {
                email
            },
            select : ['id', 'email','name','lastName','password', 'roles']
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (!bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException('Invalid credentials');
        }


        const { id, name, lastName, roles } = user;

        
        return {
            id,
            name,
            lastName,
            email,
            roles,
            token : this.jwtService.sign({id : user.id,roles: user.roles})
        }

    }





}