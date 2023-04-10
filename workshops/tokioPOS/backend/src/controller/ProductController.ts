import { AppDataSource } from '../data-source';
import { Products } from '../entity/Products';

export class ProductController {
  private productRepository = AppDataSource.getMongoRepository(Products);

  query(request, response, next) {
    return this.productRepository.find();
  }
}
