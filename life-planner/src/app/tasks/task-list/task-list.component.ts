import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../task.model';
import { TaskService } from '../task.service';
// import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  title = 'Task List';
  tasks: TaskModel[];
  errorMsg: string;
  errorFlag = false;
  selectedTask: TaskModel;

  constructor(private taskService: TaskService) {
    console.log('inside app-task-list...');
  }




  getTasks() {
    this.taskService
      .getTasks()
      .subscribe(
        (data: TaskModel[]) => { this.tasks = data; },
        (error) => {
          this.errorMsg = error;
          this.errorFlag = true;
        }
        );
  }
/*
  private getIndexOfTask = (taskId: Number) => {
    return this.tasks.findIndex((task) => {
      return task.id === taskId;
    });
  }

  selectTask(task: TaskModel) {
    this.selectedTask = task;
  }

  createNewTask() {
    const task: TaskModel = {
      name: '',
      complete: false,
      userid: 5
    };

    // By default, a newly-created task will have the selected state.
    this.selectTask(task);
  } */
/*
  deleteTask = (taskId: String) => {
    var idx = this.getIndexOfTask(taskId);
    if (idx !== -1) {
      this.tasks.splice(idx, 1);
      this.selectTask(null);
    }
    return this.tasks;
  }
*/
/*
  addTask = (task: TaskModel) => {
    this.tasks.push(task);
    this.selectTask(task);
    return this.tasks;
  }
  */
/*
  updateTask = (task: TaskModel) => {
    var idx = this.getIndexOfTask(task._id);
    if (idx !== -1) {
      this.tasks[idx] = task;
      this.selectTask(task);
    }
    return this.tasks;
  }
  */

  ngOnInit() {
    this.getTasks();
  }
}
