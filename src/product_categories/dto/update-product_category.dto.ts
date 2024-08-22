import { PartialType } from '@nestjs/mapped-types';
import { CreateProductCategoryDto } from './create-product_category.dto';

export class UpdateProductCategoryDto {
    id: string
    name: string
}
