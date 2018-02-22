import { Component, Input } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  @Input()
  task: Task;

  @Input()
  createHandler: Function;
  /*@Input()
  //updateHandler: Function;
  //@Input()
  deleteHandler: Function;
*/
  constructor (private taskService: TaskService) {}

  createTask(task: Task) {
    this.taskService.createTask(task).then((newTask: Task) => {
      this.createHandler(newTask);
    });
  }
/*
  updateTask(task: Task): void {
    this.taskService.updateTask(task).then((updatedTask: Task) => {
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
