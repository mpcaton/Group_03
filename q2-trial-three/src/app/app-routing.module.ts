import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskComponent } from './task/task.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';

const routes: Routes = [
  {
    path: 'tasks',
    component: TaskComponent,
    data: { name: 'Task List'}
  },
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      routes,
      {enableTracing: true} // debugging only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
