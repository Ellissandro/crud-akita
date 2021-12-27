import { Injectable } from '@angular/core';
import { createUser, User } from './user.model';
import { UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserService  {

  constructor(protected store: UserStore) {
  }

  add(user: User): void {
    const newUser = createUser(user);
    this.store.add(newUser);
  }

  update(id: string, user: User) {
    this.store.update(id, user);
  }
 
  delete(id: string | number) {
    this.store.remove(id);
  }
}
