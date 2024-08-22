import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product_category.dto';
import { UpdateProductCategoryDto } from './dto/update-product_category.dto';
import { ProductCategoriesRepository } from './product_categories.repository';

@Injectable()
export class ProductCategoriesService {
  constructor(private readonly productCategoriesRepository: ProductCategoriesRepository) { }

  create(createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoriesRepository.create(createProductCategoryDto);
  }

  findAll() {
    return this.productCategoriesRepository.findAll();
  }

  findOne(id: string) {
    return this.productCategoriesRepository.findOne(id);
  }

  update(id: string, updateProductCategoryDto: UpdateProductCategoryDto) {
    return this.productCategoriesRepository.update(id, updateProductCategoryDto);
  }

  remove(id: string) {
    return this.productCategoriesRepository.delete(id);
  }
}
