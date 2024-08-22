import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductCategoryDocument = HydratedDocument<ProductCategory>;

@Schema({
    timestamps: true
})
export class ProductCategory {
    @Prop({ required: true })
    name: string;
}

export const ProductCategorySchema = SchemaFactory.createForClass(ProductCategory);