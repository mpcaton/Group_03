import {Component, Input, OnInit} from '@angular/core';
import {SchedulingService} from '../core/scheduling.service';
import {Observable} from 'rxjs/Observable';
import {TaskModel} from '../tasks/task.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  @Input() schedule: TaskModel[];
  // manually split as ngFor cannot handle Maps
  // private times: Date[]
  // private tasks: DummyTaskModel[]

  constructor(private schedulingService: SchedulingService) {
  }

  ngOnInit() {
    this.getSchedule();
  }

  getSchedule() {
    const s: Observable<TaskModel[]> = this.schedulingService.createSchedule();
    s.subscribe(p => {
      this.schedule = p;
    });
  }
}
