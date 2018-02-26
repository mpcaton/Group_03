import { Injectable } from '@angular/core';
import { TaskModel } from './task.model';
import { UserModel } from '../shared/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TaskService {
  private tasksUrl = 'http://localhost:8080/api/tasks';

  constructor (protected httpClient: HttpClient) {
    console.log('inside TaskService...' + ' taskURL: ' + this.tasksUrl);
  }
  // get("/api/tasks")
  getTasks(): Observable<TaskModel[]> {
    // return this.httpClient.get<Array<TaskModel>>(this.tasksUrl);
    return this.httpClient.get(this.tasksUrl)
      .map((response: Response) => {
        const result = response.json();
        return result;
      })
      .catch((error: Response | any) => {
        return Observable.throw(error.statusText);
      });
  }

  // post("/api/tasks")
  createTask(newTask: TaskModel): Observable<TaskModel> {
    return this.httpClient.post<TaskModel>(this.tasksUrl, newTask);
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

}
