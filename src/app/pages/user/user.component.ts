import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from './state/user.model';
import { UserQuery } from './state/user.query';
import { UserService } from './state/user.service';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  search = new FormControl(null);
  users$?: Observable<User[]>;

  constructor(private userQuery: UserQuery,
    private userService: UserService) { }

  ngOnInit(): void {
    this.users$ = this.userQuery.selectUsers$;
    this.registerChangeSearch();
  }

  registerChangeSearch() {
    this.search?.valueChanges?.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => {
        this.userService.updateFilter(this.search.value)
      })
    ).subscribe();
  }

  onSubmit(f: NgForm) {
    this.userService.add(f.value);
    f.reset();
  }

  delete(id: string | number) {
    this.userService.delete(id);
  }
}
