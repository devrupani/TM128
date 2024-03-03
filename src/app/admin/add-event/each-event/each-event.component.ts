import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Events } from 'src/app/model/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-each-event',
  templateUrl: './each-event.component.html',
  styleUrls: ['./each-event.component.css']
})
export class EachEventComponent implements OnInit {

  evenntTd! : number;
  events : Events[] = [];
  constructor(private eventService : EventService, private activateRoute : ActivatedRoute, private router : Router){}

  ngOnInit() {
    const id  = this.activateRoute.snapshot.paramMap.get('id');
    console.log(id);

   this.eventService.getEventById(Number(id)).subscribe((data : Events | Events[])=>{
    console.log(data);
    if(Array.isArray(data)){
      this.events = data;
    }else{
      this.events = [data];
    }
    
   })
    
  }

  editEvent(obj : Events){
    this.router.navigate(['/edit-event',obj.event_id]);
  }

  onDeleteEvent(){
    
  }
}
