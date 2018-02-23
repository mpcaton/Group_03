import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TaskService {
  private tasksUrl = '/api/tasks';

  constructor (protected httpClient: HttpClient) {}
  // get("/api/tasks")
  getTasks(): Observable<Task[]> {
    // return this.httpClient.get<Array<Task>>(this.tasksUrl);
    return this.httpClient.get<Array<Task>>('api/tasks');
  }

  // post("/api/tasks")
  createTask(newTask: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.tasksUrl, newTask);
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

}
