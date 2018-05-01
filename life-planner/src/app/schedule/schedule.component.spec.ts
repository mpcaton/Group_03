import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';


// Modules
import { AppRoutingModule } from '../app-routing.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { RolesModule } from '../roles/roles.module';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { RoleService } from '../roles/role.service';
import { RoleModel } from '../roles/role.model';

// Components
import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ScheduleComponent } from '../schedule/schedule.component';

// import { NgFullcalendarComponent } from '../ng-fullcalendar/ng-fullcalendar.component';
import { CalendarComponent } from 'ng-fullcalendar';
import { TaskService } from '../tasks/task.service';
import { ProjectService } from '../projects/project.service';

describe('ScheduleComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        FlashMessagesModule,
        FormsModule,
        SharedModule,
        RolesModule,
        CoreModule,],
      declarations: [
        AppComponent,
        WelcomeComponent,
        HomeComponent,
        LoginComponent,
        NotFoundComponent,
        NavbarComponent,
        ScheduleComponent,
        CalendarComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/schedule' },
        RoleService,
        TaskService,
        ProjectService,
      ]
    })
      .compileComponents();
  });

  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
