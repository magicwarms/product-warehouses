import { Module } from '@nestjs/common';
import { ProductCategoriesService } from './product_categories.service';
import { ProductCategoriesController } from './product_categories.controller';
import { ProductCategory, ProductCategorySchema } from './schemas/product_categories.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductCategoriesRepository } from './product_categories.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductCategory.name, schema: ProductCategorySchema }
    ])
  ],
  controllers: [ProductCategoriesController],
  providers: [
    ProductCategoriesRepository,
    ProductCategoriesService
  ],
  exports: [ProductCategoriesService]
})
export class ProductCategoriesModule { }
