import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import {Observable} from 'rxjs/Observable';

import {AngularFireModule} from 'angularfire2';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';


// Modules
import { AppRoutingModule } from '../../app-routing.module';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { EventsModule } from '../events.module';
import {FormsModule} from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';

import {EventService} from '../event.service';
import {EventModel} from '../event.model'

// Components
import {AppComponent} from '../../app.component';
import { LoginComponent } from '../../login/login.component';
import { HomeComponent } from '../../home/home.component';
import { AddEventComponent } from './add-event.component';
import { WelcomeComponent } from '../../welcome/welcome.component';
import { AuthService } from '../../core/auth.service';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ScheduleComponent } from '../../schedule/schedule.component'

import { By } from '@angular/platform-browser';
import {ProjectService} from "../../projects/project.service";


describe('AddEventComponent', () => {
  let component: AddEventComponent;
  let fixture: ComponentFixture<AddEventComponent>;
  let service: EventService;
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
        EventsModule,
        CoreModule ],
      declarations:[
        AppComponent,
        WelcomeComponent,
        HomeComponent,
        LoginComponent,
        NotFoundComponent,
        NavbarComponent,
        ScheduleComponent
      ],
      providers:[
        {provide: APP_BASE_HREF, useValue: '/events'},
        EventService,
        ProjectService,
        FlashMessagesService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    spy = spyOn(AuthService, 'currentUserId').and.returnValue('TestAccount');
    fixture = TestBed.createComponent(AddEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
    service = de.injector.get(EventService);
    fixture.detectChanges();
  });

  it('should load page', () => {
    expect(component).toBeTruthy();
  });
  it('should get Test Account user',() =>{
    expect(AuthService.currentUserId()).toBe('TestAccount');
  });

  it('should create an event', () =>{
    const event: EventModel ={
      eid: '',
      name: 'Sample Event for Testing Only',
      sdate: '',
      stime: '',
      edate: '',
      etime: ''
    };
    spyService = spyOn(service, 'addEvent').and.returnValue('TestAccount');
    service.addEvent(event);
    expect(spyService).toHaveBeenCalled();
  });

});
