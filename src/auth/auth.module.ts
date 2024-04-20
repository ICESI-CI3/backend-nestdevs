import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Module({
    controllers : [AuthController],
    providers : [AuthService, JwtStrategy],
    imports : [
        ConfigModule,
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports : [ConfigModule],
            inject : [ConfigService],
            useFactory: (ConfigService: ConfigService) => {
                return{
                    secret : ConfigService.get('JWT_SECRET'),
                    signOptions : {
                        expiresIn : '2h'
                    }
                }
            },
        }),
    ],
    exports : [TypeOrmModule]
})
export class AuthModule {}
