import { DeleteUser } from "@/application/usecase/delete-user/DeleteUser";
import { DeleteUserInput } from "@/application/usecase/delete-user/DeleteUserInput";
import { User } from "@/domain/entity/User";
import { UniqueEntityID } from "@/domain/entity/value_object/UniqueEntityId";
import { InMemoryUserRepository } from "@/infra/repository/in-memory/InMemoryUserRepository";


test("Deve deletar um usuário existente", async () => {
  const userRepository = new InMemoryUserRepository();
  const user = new User("UserNameTest", "123456");
  userRepository.items.push(user);
  const input = new DeleteUserInput(user.getId());
  const deleteUser = new DeleteUser(userRepository);
  await deleteUser.execute(input);
  expect(userRepository.items).toHaveLength(0);
});

test("Deve falhar ao tentar deletar um usuário inexistente", async () => {
  const userRepository = new InMemoryUserRepository();
  const input = new DeleteUserInput(new UniqueEntityID().getValue());
  const deleteUser = new DeleteUser(userRepository);
  expect(async () => await deleteUser.execute(input)).rejects.toThrow("User not found")
});
