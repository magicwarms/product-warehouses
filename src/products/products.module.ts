import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/products.schemas';
import { ProductRepository } from './products.repository';
import { ProductCategoriesModule } from '../product_categories/product_categories.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema }
    ]),
    ProductCategoriesModule,
    EmailModule,
  ],
  controllers: [ProductsController],
  providers: [
    ProductRepository,
    ProductsService
  ],
})
export class ProductsModule { }
