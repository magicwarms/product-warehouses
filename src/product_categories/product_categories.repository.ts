import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductCategory } from "./schemas/product_categories.schemas";

export class ProductCategoriesRepository {
    constructor(@InjectModel(ProductCategory.name) public productCategoryModel: Model<ProductCategory>) { }

    async create(product: ProductCategory) {
        const productData = new this.productCategoryModel(product);
        productData.name = product.name;
        return productData.save();
    }
    findAll() {
        return this.productCategoryModel.find().lean();
    }
    findOne(id: string) {
        return this.productCategoryModel.findById(id).lean();
    }
    update(id: string, product: ProductCategory) {
        return this.productCategoryModel.findByIdAndUpdate(id, product, {
            new: true,
            upsert: true
        });
    }
    delete(id: string) {
        return this.productCategoryModel.findByIdAndDelete(id);
    }
}
