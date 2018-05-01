import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {HomeComponent} from './home/home.component';

import {NotFoundComponent} from './not-found/not-found.component';
import {AuthGuard} from './core/auth.guard';
import {ScheduleComponent} from './schedule/schedule.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/welcome', pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'tasks',
    loadChildren: 'app/tasks/tasks.module#TasksModule'
  },
  {
    path: 'projects',
    loadChildren: 'app/projects/projects.module#ProjectsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'events',
    loadChildren: 'app/events/events.module#EventsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'roles',
    loadChildren: 'app/roles/roles.module#RolesModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'goals',
    loadChildren: 'app/goals/goals.module#GoalsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
    canActivate: [AuthGuard]
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
