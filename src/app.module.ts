import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';

@Module({
  imports: [AuthModule, ProductModule],
  controllers: [AppController, ProductController],
  providers: [AppService, ProductsService],
    
})
export class AppModule {}
