import { ApiResponse } from 'src/app/response.mode';
import { MessageService } from 'primeng/api';
import { UserServiceService } from './../../Services/user-service.service';
import { schoolingLevelTranslations } from './../../users.constants';
import { SchoolingLevelEnum } from './../../Model/schooling-level-enum';
import { UserModel } from './../../Model/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  selectedSchoolingLevel: string = '';

  user: UserModel = {
    id: undefined,
    name: undefined,
    surname: undefined,
    email: undefined,
    schoolingLevel: SchoolingLevelEnum.Kindergarten,
    birthDate: new Date(),
  };

  schoolingLevels: Number[] = [
    SchoolingLevelEnum.Kindergarten,
    SchoolingLevelEnum.Elementary,
    SchoolingLevelEnum.HighSchool,
    SchoolingLevelEnum.HigherEducation,
  ];

  schoolingLevelstranslation = schoolingLevelTranslations;

  constructor(
    private router: Router,
    private userService: UserServiceService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userService.getUser(params['userId']).subscribe(
        (result) => {
          this.user = result;
          this.user.schoolingLevel =
            result.schoolingLevel as SchoolingLevelEnum;
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  onSubmit() {
    if (this.user.id) this.editUser();
    else this.createUser();
  }

  private createUser = () => {
    this.userService.createUser(this.user).subscribe(
      async (result) => {
        this.router.navigate(['/']);
      },
      async (error) => {
        (error.error as ApiResponse).errors.forEach((er) => {
          this.messageService.add({
            severity: 'error',
            summary: '',
            detail: er.toString(),
          });
        });
      }
    );
  };

  private editUser = () => {
    this.userService.editUser(this.user).subscribe(
      async (result) => {
        this.router.navigate(['/']);
      },
      async (error) => {
        (error.error as ApiResponse).errors.forEach((er) => {
          this.messageService.add({
            severity: 'error',
            summary: '',
            detail: er.toString(),
          });
        });
      }
    );
  };

  cancel() {
    this.router.navigate(['/']);
  }

  changeSchoolingLevel(e: any) {

    switch (e.target.value) {
      case '0':
        this.user.schoolingLevel = SchoolingLevelEnum.Kindergarten;
        break;
      case '1':
        this.user.schoolingLevel = SchoolingLevelEnum.Elementary;
        break;
      case '2':
        this.user.schoolingLevel = SchoolingLevelEnum.HighSchool;
        break;
      case '3':
        this.user.schoolingLevel = SchoolingLevelEnum.HigherEducation;
        break;
    }
  }
}
