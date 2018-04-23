import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {Observable} from 'rxjs/Observable';

import {AngularFireModule} from 'angularfire2';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';


// Modules
import {AppRoutingModule} from '../app-routing.module';
import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module';
import {GoalsModule} from './goals.module';
import {FormsModule} from '@angular/forms';
import {FlashMessagesModule} from 'angular2-flash-messages';

import {GoalService} from './goal.service';
import {GoalModel} from './goal.model';

// Components
import {AppComponent} from '../app.component';
import {LoginComponent} from '../login/login.component';
import {HomeComponent} from '../home/home.component';
import {GoalsComponent} from './goals.component';
import {WelcomeComponent} from '../welcome/welcome.component';
import {AuthService} from '../core/auth.service';
import {NotFoundComponent} from '../not-found/not-found.component';
import {NavbarComponent} from '../navbar/navbar.component';

import {By} from '@angular/platform-browser';
import {ProjectService} from '../projects/project.service';

describe('GoalsComponent', () => {
  let component: GoalsComponent;
  let service: GoalService;
  let fixture: ComponentFixture<GoalsComponent>;
  let de: DebugElement;
  let spy: jasmine.Spy;
  let spyService: jasmine.Spy;

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
        GoalsModule,
        CoreModule,],
      declarations: [
        AppComponent,
        WelcomeComponent,
        HomeComponent,
        LoginComponent,
        NotFoundComponent,
        NavbarComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/goals'},
        GoalService,
        ProjectService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {

    spy = spyOn(AuthService, 'currentUserId').and.returnValue('TestAccount');
    fixture = TestBed.createComponent(GoalsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(GoalService);

    fixture.detectChanges();
  });

  it('should load page', () => {
    expect(component).toBeTruthy();
  });

  it('should get Test Account user', () => {
    expect(AuthService.currentUserId()).toBe('TestAccount');
  });

  it('should get all goals', () => {
    spyService = spyOn(service, 'getGoals').and.returnValue('TestAccount');
    service.getGoals();
    // Check internal function
    expect(spyService).toHaveBeenCalled();

  });

});
