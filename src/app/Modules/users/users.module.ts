import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './Page/users-list/users-list.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [UsersListComponent],
  imports: [CommonModule, UsersRoutingModule, TableModule],
})
export class UsersModule {}
