import { guid } from "@datorama/akita";

export interface User {
  id: number | string;
  name: string;
  age: number
}

export function createUser(user: Partial<User>) {
  return {
    id: guid(),
    name: user.name,
    age: user.age
  } as User;
}
