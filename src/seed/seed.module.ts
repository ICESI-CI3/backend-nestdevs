import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';

@Module({
    imports: [UserModule,ProductModule],
    providers: [SeedService],
    controllers: [SeedController],
})
export class SeedModule {}
