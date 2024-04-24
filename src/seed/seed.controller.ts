import { Controller, Post, UseGuards } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UserRole } from "src/user/entities/user.entity";
import { Roles } from "src/auth/decorators/role-auth.decorator";

@UseGuards(JwtAuthGuard)
@Roles(UserRole.ADMIN )
@Controller('seed')
export class SeedController {

    constructor(
        private readonly seedService: SeedService,
    ) {}

    @Post()
    seed() {
        return this.seedService.seed();
    }
    
}