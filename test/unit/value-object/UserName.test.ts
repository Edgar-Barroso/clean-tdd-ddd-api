import { UserName } from "@/domain/entity/value_object/UserName"

test("Deve validar um username",()=>{
    const userName = new UserName("usernamevalido")
    expect(userName.getValue()).toBe("usernamevalido")
})

test("Deve levantar um erro ao criar username inválido",()=>{
    expect(()=>new UserName("username valido@")).toThrow("Invalid userName")
})