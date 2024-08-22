import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './products.repository';
import { Product } from './schemas/products.schemas';
import { ProductCategoriesService } from '../product_categories/product_categories.service';
import mongoose, { Types } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productCategoryService: ProductCategoriesService
  ) { }

  async create(createProductDto: CreateProductDto) {

    const productCategory = await this.productCategoryService.findOne(createProductDto.categoryId);
    if (!productCategory) {
      throw new Error('Product category not found');
    }

    const product: Product = {
      category: productCategory,
      ...createProductDto
    }
    return this.productRepository.create(product);
  }

  findAll() {
    return this.productRepository.findAll();
  }

  findOne(id: string) {
    return this.productRepository.findOne(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productCategory = await this.productCategoryService.findOne(updateProductDto.categoryId);
    if (!productCategory) {
      throw new Error('Product category not found');
    }

    const product: Product = {
      category: productCategory,
      ...updateProductDto
    }
    return this.productRepository.update(id, product);
  }

  remove(id: string) {
    return this.productRepository.delete(id);
  }
}
