import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from 'src/app/model/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  events : Events[] = [];
  constructor(private eventService : EventService, private routerService : Router){}

  ngOnInit() {
    this.eventService.getAllEvents().subscribe((data : Events[]) => {
      this.events = data
      console.log(this.events);  
    })  
  }

  seeEvent(id: number) {
    this.routerService.navigate(['/event', id]);
  }

}
