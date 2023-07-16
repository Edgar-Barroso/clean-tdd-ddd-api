import { Message } from "@/domain/entity/Message"
import { Session } from "@/domain/entity/Session"
import { User } from "@/domain/entity/User"

test("Deve ser possivel criar uma sessao e adicionar usuários",()=>{
    const session = new Session("nome teste")
    session.addUserId("userId-01")
    expect(session.userIds[0]).toBe("userId-01")
})

test("Deve ser possivel remove um usuário da sessao",()=>{
    const session = new Session("nome teste")
    const user = new User("userName1","123456")
    session.addUserId(user.getId())
    session.removeUserId(user.getId())
    expect(session.userIds).toHaveLength(0)
})


