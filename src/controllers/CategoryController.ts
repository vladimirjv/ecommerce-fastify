import { Category, PrismaClient } from "@prisma/client";

export class CategoryController {
  private prisma: PrismaClient;

  constructor(prisma_client: PrismaClient = new PrismaClient()) {
    this.prisma = prisma_client;
  }

  public async getCategories(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();
    return categories;
  }

  public createCategory() {
  }
}
