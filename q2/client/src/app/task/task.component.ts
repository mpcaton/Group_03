import { Component, OnInit } from '@angular/core';
import {TaskService} from '../common/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

    constructor(private taskservice: TaskService) {
    }
    getTasks() {
        this.taskservice.list().subscribe(taskitems => {
        })
    }


    ngOnInit() {
  }

}
