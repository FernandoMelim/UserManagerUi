import { UserModel } from './../../Model/user.model';
import { Component, OnInit } from '@angular/core';
import { SchoolingLevelEnum } from '../../Model/schooling-level-enum';
import { UserServiceService } from '../../Services/user-service.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: UserModel[] = [];

  constructor(private userService: UserServiceService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers = () => {
    this.userService.getUsersList().subscribe(
      async (result) => {
        if (result.userList) {
          result.userList.forEach((value) => {
            value.birthDate = new Date(value.birthDate);
          });
          this.users = result.userList;
        }
      },
      async (error) => {
        console.log(error);
      }
    );
  };

  public getEnumName = (schoolingLevelEnumNumber: Number) => {
    for (let en in SchoolingLevelEnum) {
      if (schoolingLevelEnumNumber == Number(en)) return SchoolingLevelEnum[en];
    }

    return '';
  };
}
