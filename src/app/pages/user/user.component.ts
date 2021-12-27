import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from './state/user.model';
import { UserQuery } from './state/user.query';
import { UserService } from './state/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users$?: Observable<User[]>;

  constructor(private userQuery: UserQuery,
    private userService: UserService) { }

  ngOnInit(): void {
    this.users$ = this.userQuery.selectUsers$;
  }

  onSubmit(f: NgForm) {
   this.userService.add(f.value);
   f.reset();
  }

  delete(id: string | number) {
    this.userService.delete(id);
  }
}
