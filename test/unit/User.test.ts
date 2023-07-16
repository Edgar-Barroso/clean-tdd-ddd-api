import { User } from "@/domain/entity/User"

test("Deve criar um usuário com username válido",()=>{
    const user = new User("userNameTest","123456")
    expect(user.getUserName()).toBe("userNameTest")

})

test("Deve levantar um erro ao tentar criar um usuário com username inválido",()=>{
    expect(()=>new User("02 d@ @0d","123456")).toThrow("Invalid userName")
})

test("Deve criar um usuário com senha válida",()=>{
    const user = new User("userNameTest","123456")
    expect(user.getPassword()).toBe("123456")
})

test("Deve levantar um erro ao tentar criar um usuário com senha inválida",()=>{
    expect(()=>new User("userNameTest","123 _456")).toThrow("Invalid password")

})
