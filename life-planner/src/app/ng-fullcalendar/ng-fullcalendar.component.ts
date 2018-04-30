import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { SchedulingService } from '../core/scheduling.service'
import { TimeSlot, TaskModel } from '../tasks/task.model'

interface Item {
  title: String
  start: String
  end: String
}

// internal value of time
const hourVal: number =
  new Date(2018, 3, 8, 10).valueOf() -
  new Date(2018, 3, 8, 9).valueOf()
const minuteVal: number =
  new Date(2018, 3, 8, 10, 2).valueOf() -
  new Date(2018, 3, 8, 10, 1).valueOf()
// ten minutes (1 / 6 of an hour)
const defaultWeight: number = 1 / 6

@Component({
  selector: 'app-ng-fullcalendar',
  templateUrl: './ng-fullcalendar.component.html',
})
export class NgFullcalendarComponent implements OnInit {

  items: TaskModel[]
  calendarOptions: Options
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent

  /* to fix testing issue "can't bind to ..." */
  @Input("options") options: Options;

  constructor(private scheduling: SchedulingService) { }

  ngOnInit() {
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: undefined
    };
  }

  /**
   * testing interacting with calendar interface, can remove any time
   */
  test() {
    let el = {
      title: 'New event',
      start: '2018-04-16',
      end: '2018-04-18',
    }
    this.ucCalendar.fullCalendar('renderEvent', el);
    this.ucCalendar.fullCalendar('rerenderEvents');
    console.log("test function is called")
  }

  /**
   * get events from scheduling service to display on calendar
   */
  /*
  getSchedule() {
    this.scheduling.createSchedule().subscribe(schedule => {
      this.items = schedule
    })
  }

  updateCalendar() {
    this.getSchedule()
    this.items.forEach((task: TaskModel) => {
      task.schedule.forEach((slot: TimeSlot) => {
        this.ucCalendar.fullCalendar('renderEvent', {
          title: task.name,
          start: slot.start.toLocaleString(),
          end: slot.end.toLocaleString()
        });
      })
    })
  }
  */
  updateCalendar() {
    this.scheduling.createSchedule().subscribe((schedule: TaskModel[]) => {
      schedule.forEach((task: TaskModel) => {
        task.schedule.forEach((slot: TimeSlot) => {
          this.ucCalendar.fullCalendar('renderEvent', {
            title: task.name,
            start: slot.start.toLocaleString(),
            end: slot.end.toLocaleString()
          });
        })
      })
    })
  }
}