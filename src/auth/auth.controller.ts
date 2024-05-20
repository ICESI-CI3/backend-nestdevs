import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthenticateDto } from "./dto/authenticate.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { RoleGuard } from "./guards/role-auth.guard";
import { Roles } from "./decorators/role-auth.decorator";
import { UserRole } from "../user/entities/user.entity";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() AuthenticateDto: AuthenticateDto){
        return this.authService.login(AuthenticateDto);
    }

    @Roles(UserRole.ADMIN)
    @Get('admin')
    @UseGuards(JwtAuthGuard,RoleGuard)
    privateRouteAdmin(@Res() res){
        return res.status(HttpStatus.OK).json('You are authorized admin');
    }

    @Roles(UserRole.SELLER)
    @Get('seller')
    @UseGuards(JwtAuthGuard,RoleGuard)
    privateRouteSellern(@Res() res){
        return res.status(HttpStatus.OK).json('You are authorized seller');
    }
    

    

}