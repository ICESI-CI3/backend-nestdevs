import { Injectable } from "@nestjs/common";
import {v4 as uuid} from 'uuid';
import { IAuthenticate, UserRole } from "./model/user";
import { AuthenticateDto } from "./dto/authenticate.dto";
import { sign } from 'jsonwebtoken'


@Injectable()
export class AuthService {
  users = [
    {
        id: uuid(),
        email: 'johndoe@mail.com',
        password: 'johndoe',
        role : UserRole.ADMIN
    },
    {
        id: uuid(),
        email: 'michael@mail.com',
        password: 'michael',
        role : UserRole.SELLER
    }
  ]

  authenticate(authenticateDto: AuthenticateDto):IAuthenticate {
    const user = this.users.find(
        (user) => 
            user.email === authenticateDto.email && 
            user.password === authenticateDto.password
    );
    if (!user) {
       throw new Error('Invalid credentials');
    }
    const token = sign({...user}, 'secret');

    return {
        user,
        token
    }
  }
}