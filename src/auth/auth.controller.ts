import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthenticateDto } from "./dto/authenticate.dto";
<<<<<<< Updated upstream
=======
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { RoleGuard } from "./guards/role-auth.guard";
import { Roles } from "./decorators/role-auth.decorator";
import { UserRole } from "src/user/entities/user.entity";

>>>>>>> Stashed changes
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Res() res, @Body() authenticateDto: AuthenticateDto) {
       try {
           const response = this.authService.authenticate(authenticateDto);
            return res.status(HttpStatus.OK).json(response);
       } catch (error) {
            return res.status(error.status).json({ message: error.message });
         }
    }
<<<<<<< Updated upstream
=======

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
    
    


>>>>>>> Stashed changes
}