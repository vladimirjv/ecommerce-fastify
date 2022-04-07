import { PrismaClient, User } from "@prisma/client";
import { SetRequired, Merge } from "type-fest";
import { NotFound, Unauthorized } from "http-errors";
import bcrypt from 'bcryptjs';
import * as jwt from '@/utils/jwt'; // Partially, gonna change to fastify decorator

type UserRegister = SetRequired<Partial<User>, "email" | "password">;

export class AdminController {
  private prisma: PrismaClient;

  constructor(prisma_client: PrismaClient = new PrismaClient()) {
    this.prisma = prisma_client;
  }

  /**
   * register
   */
  public async register(user: UserRegister): Promise<Merge<UserRegister, { token: string }>> {
    try {
      user.password = bcrypt.hashSync(user.password as string, 8);
      const _createdUser = await this.prisma.user.create({
        data: {
          ...user
        }
      })
      const newUser: Merge<UserRegister, { token: string }> = {
        ..._createdUser,
        token: await jwt.signAccessToken(user)
      };
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  /**
   * getUsers
   */
  public async getUsers() {
    const users = await this.prisma.user.findMany({ 
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      }
    });
    return users;
  }

  /**
   * login
   */
  public async login(data: UserRegister) {
    const { email, password } = data;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new NotFound("User Does Not Exist");
    const checkPassword = bcrypt.compareSync(password as string, user.password as string);
    if (!checkPassword) throw new Unauthorized('Email address or password not valid')
    delete (user as Partial<typeof user>).password;
    const accessToken = await jwt.signAccessToken(user)
    return { ...user, accessToken }
  }
}