import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoriesService } from './product_categories.service';
import { ProductCategoriesRepository } from './product_categories.repository';
import { ProductCategory, ProductCategorySchema } from './schemas/product_categories.schemas';
import { getModelToken } from '@nestjs/mongoose';
import mongoose from 'mongoose';

const productCategoryMock = [
  {
    name: "test category 1",
  },
  {
    name: "test category 2",
  }
]

describe('ProductCategoriesService', () => {
  let productCategoryService: ProductCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductCategoriesRepository,
        ProductCategoriesService,
        {
          provide: getModelToken(ProductCategory.name),
          useValue: mongoose.model(ProductCategory.name, ProductCategorySchema)
        }
        // {
        //   provide: getModelToken(ProductCategory.name),
        //   useValue: {
        //     find: jest.fn().mockImplementation(async () => productCategoryMock),
        //     create: jest.fn().mockImplementation(async () => productCategoryMock[0]),
        //     findById: jest.fn().mockImplementation(async () => productCategoryMock[0]),
        //     findByIdAndUpdate: jest.fn().mockImplementation(async () => productCategoryMock[0]),
        //     findByIdAndDelete: jest.fn().mockImplementation(async () => productCategoryMock[0]),
        //   }
        // }
      ],
    }).compile();

    productCategoryService = module.get<ProductCategoriesService>(ProductCategoriesService);
  });

  it('should be defined', () => {
    expect(productCategoryService).toBeDefined();
  });
});
