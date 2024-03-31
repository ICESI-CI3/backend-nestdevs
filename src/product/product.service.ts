import { Injectable } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { Product } from "./model/product";

@Injectable()
export class ProductService {
  
  products = [
    {
      id: uuid(),
      name: 'Smartphone',
      description: 'Teléfono inteligente con cámara de alta resolución y pantalla táctil.',
      price: 499.99,
    },
    {
      id: uuid(),
      name: 'Laptop',
      description: 'Ordenador portátil ligero y potente con procesador de última generación.',
      price: 899.99,
    },
    {
      id: uuid(),
      name: 'Auriculares inalámbricos',
      description: 'Auriculares con cancelación de ruido y conectividad Bluetooth.',
      price: 149.99,
    },
    {
      id: uuid(),
      name: 'Smartwatch',
      description: 'Reloj inteligente con seguimiento de actividad física y notificaciones inteligentes.',
      price: 199.99,
    }
  ];

  createProduct(productData: Partial<Product>): Product {
    const product: Product = {
      id: uuid(),
      ...productData,
    } as Product; 

    this.products.push(product);
    return product;
  }

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product {
    return this.products.find(product => product.id === id);
  }
}
