import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Q2-2';
  constructor() {
  }

  ngOnInit() {
    // Initialize collapse button
    // Initialize collapsible (uncomment the line below if you use the dropdown variation)
    // $('.collapsible').collapsible();
  }
}

