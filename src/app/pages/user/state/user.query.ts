import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { combineLatest, Observable } from 'rxjs';
import { User } from './user.model';
import { UserStore, UserState } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserQuery extends QueryEntity<UserState> {

  selectVisibilityFilter$ = this.select(state => state.ui.filter);

  selectUsers$: Observable<User[]> = combineLatest(
      this.selectVisibilityFilter$,
      this.selectAll(),
      this.getVisibleUsers
  )

  constructor(protected store: UserStore) {
    super(store);
  }
  private getVisibleUsers(filter: string, users: User[]): User[] {
    return users.filter(user => user.name.includes(filter))
  }
}
