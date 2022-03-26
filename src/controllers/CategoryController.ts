import { Category, PrismaClient } from "@prisma/client";
import { CategoryDeleteBody, CategoryPostBody, CategoryUpdateBody } from "../schemas/types/CategoryBaseSchema";

export class CategoryController {
  private prisma: PrismaClient;

  constructor(prisma_client: PrismaClient = new PrismaClient()) {
    this.prisma = prisma_client;
  }

  public async getCategories(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();
    return categories;
  }

  public async createCategory(
    category: CategoryPostBody
  ): Promise<Category> {
    const { name } = category;
    try {
      const newCategory = await this.prisma.category.create({ data: { name } });
      return newCategory;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getCategoryByID(categoryID: number): Promise<Category | null> {
    try {
      const category = await this.prisma.category.findUnique({
        where: { id: categoryID },
      });
      return category;
    } catch (error) {
      throw error;
    }
  }

  public async updateCategory(categoryID: number, category: CategoryUpdateBody): Promise<Category> {
    const updatedCategory = await this.prisma.category.update({
      data: { ...category },
      where: {id: categoryID},
    })
    return updatedCategory;
  }

  public async deleteCategory(category: CategoryDeleteBody): Promise<Category> {
    const { id } = category;
    const deleteCategory = await this.prisma.category.delete({where: {id}});
    return deleteCategory;
  }
}
