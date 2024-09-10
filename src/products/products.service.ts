import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './products.repository';
import { Product } from './schemas/products.schemas';
import { ProductCategoriesService } from '../product_categories/product_categories.service';
import { Types } from 'mongoose';
import { EmailService } from '../email/email.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productCategoryService: ProductCategoriesService,
    private readonly mailService: EmailService
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

    const productCreated = await this.productRepository.create(product);
    if (productCreated) {
      this.mailService.sendEmail({
        email: 'andhanautama@gmail.com',
        subject: `New product created ${product.name}`,
        html: `<p>Hello Andhana,</p>
        <p>Thank you for store the product! Your product is now active.</p>
        <p>Description: ${product.description}</p>
        <p>Enjoy your time with us!</p>`,
      }).then((data) => {
        if (data.accepted.length > 0) {
          console.log('Email successfully sent to ' + data.accepted.join(', '));
        }
      }).catch((err) => console.error(err));
    }

    return productCreated
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
