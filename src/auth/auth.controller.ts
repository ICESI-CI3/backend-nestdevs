import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthenticateDto } from "./dto/authenticate.dto";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDto } from "./dto/create.user.dto";
import { create } from "domain";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    /*
    @Get('hello')
    @UseGuards( AuthGuard() )
    getHello(): string {
        return 'Hello World!';
    }
    */




    @Get('login')
    login(@Body() authenticateDto: AuthenticateDto, @Res() res) {
        return this.authService.login(authenticateDto);        
    }

    @Post('register')
    register(@Body() createUserDto: CreateUserDto, @Res() res) {
        return this.authService.register(createUserDto);
    }

}