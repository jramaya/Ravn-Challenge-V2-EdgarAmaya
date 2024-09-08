import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './model/product.model';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Public } from '../common/decorators/is-public.decorator';
import { ProductPagination } from './model/product-pagination.model';
import { OnlyManager } from '../common/decorators/only-manager.decorator';

@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @OnlyManager()
  @Post()
  @ApiCreatedResponse({ description: 'Product created', type: Product })
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @Public()
  @Get(':id')
  @ApiOkResponse({ description: 'Product details', type: Product })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async getProduct(@Param('id') id: string): Promise<any> {
    return this.productsService.getProductDetails(id);
  }

  @Public()
  @Get()
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Number of items per page',
    example: 10,
  })
  @ApiOkResponse({ description: 'List of products', type: ProductPagination })
  async listProducts(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<ProductPagination> {
    return this.productsService.listProducts(page, limit);
  }

  @Public()
  @Get('category/:categoryId')
  @ApiOkResponse({
    description: 'List of products by category',
    type: ProductPagination,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Number of items per page',
    example: 10,
  })
  async searchProductsByCategory(
    @Param('categoryId') categoryId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<ProductPagination> {
    return this.productsService.searchProductsByCategory(
      categoryId,
      page,
      limit,
    );
  }

  @Patch(':id')
  @OnlyManager()
  @ApiOkResponse({ description: 'Product updated', type: Product })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @OnlyManager()
  @ApiOkResponse({ description: 'Product deleted', type: Product })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async deleteProduct(@Param('id') id: string): Promise<Product> {
    return this.productsService.deleteProduct(id);
  }

  @Patch(':id/disable')
  @OnlyManager()
  @ApiOkResponse({ description: 'Product disabled', type: Product })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async disableProduct(@Param('id') id: string): Promise<Product> {
    return this.productsService.disableProduct(id);
  }
}
