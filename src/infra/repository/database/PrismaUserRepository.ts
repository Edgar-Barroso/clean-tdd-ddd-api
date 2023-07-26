import { User } from "@/domain/entity/User";
import { UserRepository } from "@/domain/repository/UserRepository";
import { prisma } from "./Prisma";

export class PrismaUserRepository implements UserRepository{
    async deleteMany(): Promise<void> {
        await prisma.user.deleteMany()
    }

    async findByUserName(userName: string): Promise<User | undefined> {
        const persistenceUser = await prisma.user.findUnique({where:{
            userName
        }})
        if(!persistenceUser) return undefined
        const domainUser = new User(persistenceUser!.userName,persistenceUser!.passwordHash,persistenceUser!.id)
        return domainUser
    }

    async findById(userId: string): Promise<User | undefined> {
        const persistenceUser = await prisma.user.findUnique({where:{
            id:userId
        }})
        if(!persistenceUser) return undefined
        const domainUser = new User(persistenceUser!.userName,persistenceUser!.passwordHash,persistenceUser!.id)
        return domainUser
    }
    async create(user: User): Promise<void> {
        await prisma.user.create({data:{
            passwordHash:user.getPassword(),
            userName:user.getUserName(),
            id:user.getId(),
        }})
    }

    async update(user: User): Promise<void> {
        await prisma.user.update({
            where: { id: user.getId()},
            data: {
              passwordHash: user.getPassword(),
              userName: user.getUserName(),
            },
          });
          
    }
    async delete(user: User): Promise<void> {
        await prisma.user.delete({
            where: { id: user.getId() },
          });
    }

}