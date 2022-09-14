import { UserModel } from './../../Model/user.model';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../Services/user-service.service';
import { schoolingLevelTranslations } from '../../users.constants';

import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: UserModel[] = [];

  constructor(
    private userService: UserServiceService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

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

  public getEnumName = (schoolingLevelEnumNumber: Number) =>
    schoolingLevelTranslations.get(schoolingLevelEnumNumber);

  public confirmDelete = (userId: Number) => {
    this.confirmationService.confirm({
      message: 'Você realmente deseja deletar esse usuário?',
      header: 'Garantia de deleção',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.deleteUser(userId);
      },
      reject: () => {},
    });
  };

  private deleteUser = (userId: Number) => {
    this.userService.deleteUser(userId).subscribe(
      async (result) => {
        let messages: String[] = [];
        if (result.statusCode != 200) {
          result.errors.forEach((error) => {
            messages.push(error);
          });
        } else {
          this.users = this.users.filter((user) => user.id != userId);
          messages.push('Usuário deletado com sucesso');
        }

        messages.forEach((message) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: message.toString(),
          });
        });
      },
      async (error) => {
        console.log(error);
      }
    );
  };
}
