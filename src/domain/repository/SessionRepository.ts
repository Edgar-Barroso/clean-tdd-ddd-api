import { Session } from "../entity/Session";

export interface SessionRepository{
    fetchPage(page: number): Promise<Session[]>;
    update(session: Session):Promise<void>;
    findById(sessionId: string):Promise<Session | undefined>
    delete(session: Session):Promise<void>
    create(session:Session):Promise<void>
}