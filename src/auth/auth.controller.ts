import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthenticateDto } from "./dto/authenticate.dto";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDto } from "./dto/create.user.dto";
import { create } from "domain";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Get('login')
    login(@Body() AuthenticateDto: AuthenticateDto){
        return this.authService.login(AuthenticateDto);
    }

    @Get('private')
    @UseGuards(AuthGuard('jwt'))
    privateRoute(@Res() res){
        return res.status(HttpStatus.OK).json('You are authorized');
    }
    


}