import { Category, PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
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
      where: { id: categoryID },
    })
    return updatedCategory;
  }

  public async deleteCategory(categoryId: number): Promise<Category> {
    try {
      const deleteCategory = await this.prisma.category.delete({ where: { id: categoryId } });
      return deleteCategory;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw Error("Category to delete does not exist", {cause: error});
        }
      }
      throw Error("Unknown error", {cause: error as Error});
    }
  }
}
