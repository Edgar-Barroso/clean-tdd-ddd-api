import { Session } from "@/domain/entity/Session";
import { SessionRepository } from "@/domain/repository/SessionRepository";
import { prisma } from "./Prisma";

export class PrismaSessionRepository implements SessionRepository{
    
    async deleteMany(): Promise<void> {
        await prisma.session.deleteMany()
    }

    async fetchPage(page: number): Promise<Session[]> {
        const sessions = await prisma.session.findMany({
            skip: (page - 1) * 20,take: 20, 
          });
          const domainSessions = sessions.map(session => new Session(session.name, session.id));
          return domainSessions;
    }
    async update(session: Session): Promise<void> {
        await prisma.session.update({where:{id:session.getId()},data:{
            name:session.name,
            id:session.getId()
        }})
    }
    async findById(sessionId: string): Promise<Session | undefined> {
        const persistenceSession = await prisma.session.findUnique({where:{id:sessionId}})
        if(!persistenceSession) return undefined
        const domainSession = new Session(persistenceSession!.name,persistenceSession!.id)
        return domainSession
        
    }
    async delete(session: Session): Promise<void> {
        await prisma.session.delete({
            where: { id: session.getId() },
          });
    }
    async create(session: Session): Promise<void> {
        await prisma.session.create({data:{
            name:session.name,
            id:session.getId()
        }})
    }
    
}