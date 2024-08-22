import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ProductCategory } from '../../product_categories/schemas/product_categories.schemas';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    stock: number;

    @Prop()
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory' })
    category: ProductCategory;
}

export const ProductSchema = SchemaFactory.createForClass(Product);