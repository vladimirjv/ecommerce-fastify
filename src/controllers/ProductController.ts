import { PrismaClient, Product } from "@prisma/client";

export class ProductController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getProducts(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();
    return products;
  }

  public createProduct() {
  }
}
