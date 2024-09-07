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

@ApiTags('Products')
@UseGuards(JwtGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ description: 'Product created', type: Product })
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  @ApiBearerAuth()
  @Public()
  @Get(':id')
  @ApiOkResponse({ description: 'Product details', type: Product })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async getProduct(@Param('id') id: string): Promise<any> {
    return this.productsService.getProductDetails(id);
  }

  @ApiBearerAuth()
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

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({ description: 'Product updated', type: Product })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOkResponse({ description: 'Product deleted', type: Product })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async deleteProduct(@Param('id') id: string): Promise<Product> {
    return this.productsService.deleteProduct(id);
  }

  @ApiBearerAuth()
  @Patch(':id/disable')
  @ApiOkResponse({ description: 'Product disabled', type: Product })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async disableProduct(@Param('id') id: string): Promise<Product> {
    return this.productsService.disableProduct(id);
  }
}
