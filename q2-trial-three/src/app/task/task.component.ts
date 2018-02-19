import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/tasks').subscribe(data => {
      this.tasks = data;
    });
  }

}
