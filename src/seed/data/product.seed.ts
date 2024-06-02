import { ProductCategory } from "src/product/model/product.entity";

export const productSeed = [
    {
        name: 'Galletas de Chocolate',
        description: 'Galletas de chocolate rellenas de chocolate',
        price: 2000,
        category: ProductCategory.FOOD,
        image: ""
    },{
        name : 'Coca Cola',
        description: 'Bebida refrescante',
        price: 3000,
        category: ProductCategory.DRINK,
    },{
        name : 'Harry Potter',
        description: 'Libro de aventuras',
        price: 20000,
        category: ProductCategory.BOOKS,
    },
    {
        name : 'Iphone 12',
        description: 'Celular de ultima generacion',
        price: 2000000,
        category: ProductCategory.ELECTRONICS,
    },{
        name : 'Zapatos',
        description: 'Zapatos de marca',
        price: 200000,
        category: ProductCategory.FASHION,
    },{
        name : 'Balon de Futbol',
        description: 'Balon de futbol profesional',
        price: 20000,
        category: ProductCategory.SPORTS,
    }
]

