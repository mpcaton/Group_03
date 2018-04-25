import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import {AngularFireModule} from 'angularfire2';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';


// Modules
import {AppRoutingModule} from '../app-routing.module';
import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module';
import {TasksModule} from './tasks.module';
import {FormsModule} from '@angular/forms';
import {FlashMessagesModule} from 'angular2-flash-messages';

import {TaskService} from './task.service';

// Components
import {AppComponent} from '../app.component';
import {LoginComponent} from '../login/login.component';
import {HomeComponent} from '../home/home.component';
import {TasksComponent} from './tasks.component';
import {WelcomeComponent} from '../welcome/welcome.component';
import {AuthService} from '../core/auth.service';
import {NotFoundComponent} from '../not-found/not-found.component';
import {NavbarComponent} from '../navbar/navbar.component';

import {ProjectService} from '../projects/project.service';
import {SpyLocation} from '@angular/common/testing';


describe('TasksComponent', () => {
  let component: TasksComponent;
  let service: TaskService;
  let fixture: ComponentFixture<TasksComponent>;
  let de: DebugElement;
  let spy: jasmine.Spy;
  let spyService: jasmine.Spy;
  let router: Router;
  let location: SpyLocation;


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
        TasksModule,
        CoreModule,
      ],
      declarations: [
        AppComponent,
        WelcomeComponent,
        HomeComponent,
        LoginComponent,
        NotFoundComponent,
        NavbarComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/tasks'},
        TaskService,
        ProjectService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {

    spy = spyOn(AuthService, 'currentUserId').and.returnValue('TestAccount');
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(TaskService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it('should load page', () => {
    expect(component).toBeTruthy();
  });

  it('should get Test Account user', () => {
    expect(AuthService.currentUserId()).toBe('TestAccount');
  });

  it('should get all tasks', () => {
    spyService = spyOn(service, 'getTasks').and.returnValue('TestAccount');
    service.getTasks();
    // Check internal function
    expect(spyService).toHaveBeenCalled();

  });

  it('navigate to "edit/" takes you to /edit/', fakeAsync(() => {

    router.navigate(['edit']).then(() => {
      tick(50);
      expect(location.path()).toEqual('/edit');
    });


  }));


  it('navigate to "tasks/add" takes you to /tasks/add', fakeAsync(() => {

    router.navigate(['add']).then(() => {
      tick(50);
      expect(location.path()).toEqual('/add');
    });


  }));

  it('navigate to "" takes you to /welcome', fakeAsync(() => {

    router.navigate(['']).then(() => {
      tick(50);
      expect(location.path()).toEqual('/welcome');
    });
  }));


});

