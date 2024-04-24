import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { sellerSeed } from "./data/seller.seed";
import { productSeed } from "./data/product.seed";
import { ProductsService } from "src/product/product.service";


@Injectable()
export class SeedService {

    constructor(
        private readonly userService: UserService,
        private readonly productService: ProductsService,
    ) {}

    
    async seed() {
        await this.userService.fillUsersWithSeedData(sellerSeed);


        const sellers = await this.userService.findAllSeller();

        for(const seller of sellers){
            for(const p of productSeed){
                const product = {
                    ...p,
                    sellerId: seller.id
                
                }
                await this.productService.create(product);
            }
        }

        return 'DB seeded successfully!'
    }

}