import { Message } from "@/domain/entity/Message"
import { Session } from "@/domain/entity/Session"
import { User } from "@/domain/entity/User"

test("Deve ser possivel criar uma sessao e adicionar usuários",()=>{
    const session = new Session("nome teste")
    expect(session.name).toBe("nome teste")
})
