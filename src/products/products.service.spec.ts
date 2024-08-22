import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/products.schemas';
import mongoose, { Model } from 'mongoose';
import { ProductRepository } from './products.repository';
import { ProductCategoriesService } from './../product_categories/product_categories.service';
import { ProductCategoriesModule } from './../product_categories/product_categories.module';
import { ProductCategoriesRepository } from './../product_categories/product_categories.repository';

const productMock = [
  {
    name: "test",
    description: "test",
    stock: 1,
    category: "test"
  },
  {
    name: "test 2",
    description: "test 2",
    stock: 1,
    category: "test 2"
  }
]

const productCatMock = [
  {
    name: "test cat",
  },
]

describe('ProductsService', () => {
  let productRepository: ProductRepository
  let productService: ProductsService;
  let productCategoryService: ProductCategoriesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRepository,
        ProductsService,
        ProductCategoriesService,
        ProductCategoriesRepository,
        {
          provide: getModelToken(Product.name),
          useValue: mongoose.model(Product.name, ProductSchema)
        }
        // {
        //   provide: getModelToken('Product'),
        //   useValue: {
        //     find: jest.fn().mockImplementation(async () => productMock),
        //     create: jest.fn().mockImplementation(async () => productMock[0]),
        //     findById: jest.fn().mockImplementation(async () => productMock[0]),
        //     findByIdAndUpdate: jest.fn().mockImplementation(async () => productMock[0]),
        //     findByIdAndDelete: jest.fn().mockImplementation(async () => productMock[0]),
        //   }
        // }
      ],
    }).compile();

    productRepository = module.get<ProductRepository>(ProductRepository);
    productService = module.get<ProductsService>(ProductsService);
    // productCategoryService = module.get<ProductCategoriesService>(ProductCategoriesService);

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    // jest.spyOn(productCategoryService, 'findOne').mockReturnValue({
    //   exec: jest.fn().mockResolvedValueOnce(productCatMock),
    // } as any);
    // expect(productService).toBeDefined();
  });

  // it('should return all products', async () => {
  //   productRepository.findAll = jest.fn().mockResolvedValue(productMock);

  //   const products = await productService.findAll();
  //   expect(products).toEqual(productMock);
  //   expect(products).toBeInstanceOf(Array);
  //   expect(productRepository.findAll).toHaveBeenCalled();
  // });
});
