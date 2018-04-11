import { NgModule } from '@angular/core';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { SharedModule } from '../shared/shared.module';
import { TaskService } from './task.service';
import { SelectTaskComponent } from './select-task/select-task.component';
import { ShowTasksComponent } from './show-tasks/show-tasks.component';

@NgModule({
  imports: [
    TasksRoutingModule,
    SharedModule
  ],
  declarations: [
    TasksComponent,
    TaskDetailComponent,
    AddTaskComponent,
    EditTaskComponent,
    SelectTaskComponent,
    ShowTasksComponent
  ],
  providers: [
    TaskService
  ],
  exports: [
    SharedModule,
    TasksComponent,
    TaskDetailComponent,
    AddTaskComponent,
    EditTaskComponent
  ]
})

export class TasksModule {

}
