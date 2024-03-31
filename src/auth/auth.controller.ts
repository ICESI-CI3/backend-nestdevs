import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthenticateDto } from "./dto/authenticate.dto";
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
}