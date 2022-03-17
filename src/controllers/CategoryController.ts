import { Category, PrismaClient } from "@prisma/client";

export class CategoryController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getCategories(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();
    return categories;
  }

  public createCategory() {
  }
}
