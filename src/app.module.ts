import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { CommonModule } from './common/common.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    ProductModule,
    OrderModule,
    CommonModule,
    RatingModule,
  ],
  controllers: [AppController, ProductController],
  providers: [AppService,]
})
export class AppModule {}
