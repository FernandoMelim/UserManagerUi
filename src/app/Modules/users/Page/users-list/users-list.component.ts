import { ApiResponse } from 'src/app/response.mode';
import { UserModel } from './../../Model/user.model';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../Services/user-service.service';
import { schoolingLevelTranslations } from '../../users.constants';
import { Router } from '@angular/router';

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
    private messageService: MessageService,
    private router: Router
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

  public getEnumName = (schoolingLevelEnumNumber: Number) => {
    return schoolingLevelTranslations.get(schoolingLevelEnumNumber);
  };

  public confirmDelete = (userId: Number) => {
    this.confirmationService.confirm({
      message: 'Você realmente deseja deletar esse usuário?',
      header: 'Deletar usuário',
      icon: 'pi pi-info-circle',
      accept: () => this.deleteUser(userId),
      reject: () => {},
    });
  };

  private deleteUser = (userId: Number) => {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: '',
          detail: 'Usuário deletado com sucesso',
        });

        this.users = this.users.filter((user) => user.id != userId);
      },
      (error) => {
        let messages: String[] = [];
        (error.error as ApiResponse).errors.forEach((er) => {
          messages.push(er);
        });

        messages.forEach((message) => {
          this.messageService.add({
            severity: 'error',
            summary: '',
            detail: message.toString(),
          });
        });
      }
    );
  };

  public adicionarUsuario = () => {
    this.router.navigate(['/adduser']);
  };

  public editUser = (userId: Number) => {
    debugger;
    this.router.navigate(['/adduser'], { queryParams: { userId: userId } });
  };
}
