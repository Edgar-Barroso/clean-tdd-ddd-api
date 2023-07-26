import { Password } from "@/domain/entity/value_object/Password"

test("Deve validar uma senha",()=>{
    const userName = new Password("password123")
    expect(userName.getValue()).toBe("password123")
})

test("Deve levantar um erro ao criar senha inválida",()=>{
    expect(()=>new Password("password123_*21")).toThrow("Invalid password")
})

test("Deve levantar um erro ao criar senha inválida",()=>{
    expect(()=>new Password("12345")).toThrow("Invalid password")
})