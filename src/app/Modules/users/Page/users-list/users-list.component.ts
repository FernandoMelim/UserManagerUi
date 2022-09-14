import { UserModel } from './../../Model/user.model';
import { Component, OnInit } from '@angular/core';
import { SchoolingLevelEnum } from '../../Model/schooling-level-enum';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: UserModel[] = [
    {
      id: 1,
      name: 'fernando',
      surname: 'melim',
      email: 'fernando.lief@hotmail.com',
      schoolingLevel: SchoolingLevelEnum.HigherEducation,
      birthDate: new Date(),
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
