import { Message } from "@/domain/entity/Message"


test("Deve ser possivel criar uma mensagem",()=>{
    const message = new Message("texto texto texto","userId-01","sessionId-01")
    expect(message.getId()).toBeTruthy()    
})

test("Deve ser possivel criar uma mensagem com uma data definida",()=>{
    const message = new Message("texto texto texto","userId-01","sessionId-01",new Date("2023-01-01"))
    expect(message.getDate()).toEqual(new Date("2023-01-01"))
})


