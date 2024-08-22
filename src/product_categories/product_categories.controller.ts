import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductCategoriesService } from './product_categories.service';
import { CreateProductCategoryDto } from './dto/create-product_category.dto';
import { UpdateProductCategoryDto } from './dto/update-product_category.dto';

@Controller({
  version: '1',
  path: 'product-categories',
})
export class ProductCategoriesController {
  constructor(private readonly productCategoriesService: ProductCategoriesService) { }

  @Post("/create")
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoriesService.create(createProductCategoryDto);
  }

  @Get("/all")
  findAll() {
    return this.productCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCategoriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductCategoryDto: UpdateProductCategoryDto) {
    return this.productCategoriesService.update(id, updateProductCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCategoriesService.remove(id);
  }
}
