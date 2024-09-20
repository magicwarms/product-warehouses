import { IsMongoId, IsNotEmpty, IsNumber, IsUUID, MinLength } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @MinLength(10, { message: 'Description must be at least 10 characters' })
    description: string;

    @IsNumber(undefined, { message: 'Stock must be a number' })
    stock: number;

    @IsMongoId({ message: 'Invalid category id' })
    categoryId: string;
}
