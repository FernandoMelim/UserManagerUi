import { ApiResponse } from 'src/app/response.mode';
import { MessageService } from 'primeng/api';
import { UserServiceService } from './../../Services/user-service.service';
import { schoolingLevelTranslations } from './../../users.constants';
import { SchoolingLevelEnum } from './../../Model/schooling-level-enum';
import { UserModel } from './../../Model/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  user: UserModel = {
    id: undefined,
    name: undefined,
    surname: undefined,
    email: undefined,
    schoolingLevel: SchoolingLevelEnum.Elementary,
    birthDate: new Date(),
  };

  schoolingLevels = [
    SchoolingLevelEnum.Kindergarten,
    SchoolingLevelEnum.Elementary,
    SchoolingLevelEnum.HighSchool,
    SchoolingLevelEnum.HigherEducation,
  ];

  schoolingLevelstranslation = schoolingLevelTranslations;

  constructor(
    private router: Router,
    private userService: UserServiceService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('test');
    this.userService.createUser(this.user).subscribe(
      async (result) => {
        debugger;
        console.log(result);
      },
      async (error) => {
        debugger;
        (error.error as ApiResponse).errors.forEach((er) => {
          this.messageService.add({
            severity: 'error',
            summary: '',
            detail: er.toString(),
          });
        });
      }
    );
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
