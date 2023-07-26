import { UpdateUser } from "@/application/usecase/update-user/UpdateUser";
import { UpdateUserInput } from "@/application/usecase/update-user/UpdateUserInput";
import { User } from "@/domain/entity/User";
import { UniqueEntityID } from "@/domain/entity/value_object/UniqueEntityId";
import { InMemoryUserRepository } from "@/infra/repository/in-memory/InMemoryUserRepository";

test("Deve alterar os dados de um usuário existente", async () => {
  const userRepository = new InMemoryUserRepository();
  const user = new User("userNameTest1", "password1");
  userRepository.items.push(user);
  const updateUser = new UpdateUser(userRepository);
  const input = new UpdateUserInput(user.getId(), "userNameTest2", "password2");
  await updateUser.execute(input);

  expect(userRepository.items[0].getUserName()).toBe("userNameTest2")
});

test("Deve falhar ao tentar alterar os dados de um usuário que nao existe", async () => {
  const userRepository = new InMemoryUserRepository();
  const updateUser = new UpdateUser(userRepository);
  const input = new UpdateUserInput(
    new UniqueEntityID().getValue(),
    "userNameTest",
    "12345678"
  );
  expect(async () => {
    await updateUser.execute(input);
  }).rejects.toThrow("User not found")
});
