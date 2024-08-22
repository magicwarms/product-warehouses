import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/products.schemas';
import mongoose, { Model } from 'mongoose';
import { ProductRepository } from './products.repository';
import { ProductCategoriesService } from './../product_categories/product_categories.service';
import { ProductCategoriesModule } from './../product_categories/product_categories.module';
import { ProductCategoriesRepository } from './../product_categories/product_categories.repository';
import { ProductCategory, ProductCategorySchema } from './../product_categories/schemas/product_categories.schemas';

const productMock = [
  {
    _id: "testid1",
    name: "test",
    description: "test",
    stock: 1,
    category: "test"
  },
  {
    _id: "testid2",
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
        },
        {
          provide: getModelToken(ProductCategory.name),
          useValue: mongoose.model(ProductCategory.name, ProductCategorySchema)
        },
      ],
    }).compile();

    productRepository = module.get<ProductRepository>(ProductRepository);
    productService = module.get<ProductsService>(ProductsService);
    productCategoryService = module.get<ProductCategoriesService>(ProductCategoriesService);

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    // jest.spyOn(productCategoryService, 'findOne').mockReturnValue({
    //   exec: jest.fn().mockResolvedValueOnce(productCatMock),
    // } as any);
    expect(productService).toBeDefined();
    expect(productCategoryService).toBeDefined();
  });

  it('should return all products', async () => {
    productRepository.findAll = jest.fn().mockResolvedValue(productMock);

    const products = await productService.findAll();

    expect(products).toEqual(productMock);
    expect(products).toBeInstanceOf(Array);
    expect(productRepository.findAll).toHaveBeenCalled();
  });

  it('should return one product', async () => {
    productRepository.findOne = jest.fn().mockResolvedValue(productMock[0]);

    const product = await productService.findOne(productMock[0]._id);
    expect(product).toEqual(productMock[0]);
    expect(product).toBeInstanceOf(Object);
    expect(productRepository.findOne).toHaveBeenCalled();
    expect(productRepository.findOne).toHaveBeenCalledWith(productMock[0]._id);
  })
});
