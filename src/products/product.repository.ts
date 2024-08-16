import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./schemas/products.schemas";
import { Model } from "mongoose";

export class ProductRepository {
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>;

    create(product: Product) {
        return this.productModel.create(product);
    }
    findAll() {
        return this.productModel.find();
    }
    findOne(id: string) {
        return this.productModel.findById(id);
    }
    update(id: string, product: Product) {
        return this.productModel.findByIdAndUpdate(id, product, { new: true });
    }
    delete(id: string) {
        return this.productModel.findByIdAndDelete(id);
    }
}
