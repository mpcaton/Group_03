import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
// import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[];
  selectedTask: Task;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }


  getTasks() {
    this.taskService
      .getTasks()
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks.map((task) => {
          if (!task.userid) {
            task.userid = 5;
          }
          return task;
        });
      });
  }


  private getIndexOfTask = (taskId: Number) => {
    return this.tasks.findIndex((task) => {
      return task.id === taskId;
    });
  }

  selectTask(task: Task) {
    this.selectedTask = task;
  }

  createNewTask() {
    const task: Task = {
      name: '',
      complete: false,
      userid: 5
    };

    // By default, a newly-created task will have the selected state.
    this.selectTask(task);
  }
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
  addTask = (task: Task) => {
    this.tasks.push(task);
    this.selectTask(task);
    return this.tasks;
  }
/*
  updateTask = (task: Task) => {
    var idx = this.getIndexOfTask(task._id);
    if (idx !== -1) {
      this.tasks[idx] = task;
      this.selectTask(task);
    }
    return this.tasks;
  }
  */
}
