import { Component, Input } from '@angular/core';
import { TaskModel } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  @Input()
  task: TaskModel;

  @Input()
  createHandler: Function;
  /*@Input()
  //updateHandler: Function;
  //@Input()
  deleteHandler: Function;
*/
  constructor (private taskService: TaskService) {}

  createTask(task: TaskModel) {
    this.taskService.createTask(task).subscribe((newTask: TaskModel) => {
      this.createHandler(newTask);
    });
  }
/*
  updateTask(task: TaskModel): void {
    this.taskService.updateTask(task).then((updatedTask: TaskModel) => {
      this.updateHandler(updatedTask);
    });
  }

  deleteTask(taskId: String): void {
    this.taskService.deleteTask(taskId).then((deletedTaskId: String) => {
      this.deleteHandler(deletedTaskId);
    });
  }
  */
}
