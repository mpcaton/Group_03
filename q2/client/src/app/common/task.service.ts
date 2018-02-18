import { Injectable } from '@angular/core';
import { Task } from '../task/task.model';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class TaskService {

    private URL = 'http://localhost:3000/api/task';

    constructor(
        protected httpClient: HttpClient,
    ) {}

    public list(): Observable<Array<Task>> {
        return this.httpClient.get<Array<Task>>(`${this.URL}s`);
    }

}