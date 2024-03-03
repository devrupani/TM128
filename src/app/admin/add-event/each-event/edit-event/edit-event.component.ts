import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Events } from 'src/app/model/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent {
[x: string]: any;

  eventId!: number;
  evt: Events[]= [];
  editForm!: FormGroup;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (id !== null) {
      this.initForm();
      this.eventId = +id;
      this.getEvent();
      console.log(id);
      
    } else {
      console.log("Not Id . . . "); 
    }
  }
  
  initForm(): void {
    this['editForm'] = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      venue: ['', Validators.required],
      date: ['', Validators.required],
      event_category: ['', Validators.required]
    });
  }

  getEvent(): void {
    // this.eventService.getEventById(this.eventId).subscribe(event => {
    //   if(Array.isArray(this.evt)){
    //     this.evt = event;
        
    //   }else{
    //     this.evt = event;
    //   }

      
    //   console.log(this.evt);
    //   this['editForm'].patchValue({
      
    //   }) // Pre-fill form with event data
    // });
    this.eventService.getEventById(this.eventId).subscribe(event => {
      if(event){
        this.evt  =event;
      }
    })

  }

  // getEvent() {
  //   this.eventService.getEventById(this.eventId).subscribe(events => {
  //     if (events.length > 0) {
  //       const event = events[0]; // Get the first event
  //       this.editForm.patchValue({
  //         title: event['title'],
  //         description: event.description,
  //         venue: event.venue,
  //         date: event.date,
  //         event_category: event.event_category
  //       });
  //     } else {
  //       console.error('No event found');
  //     }
  //   });
  // }
  
  
  
  
  onSubmit(): void {
    if (this['editForm'].valid) {
      // If form is valid, gather form data and update event
      const formData = this['eventForm'].value;
      this.eventService.upEvent(this.eventId, formData).subscribe(() => {
        // Handle successful update
        console.log('Event updated successfully!');
      }, error => {
        // Handle error
        console.error('Error updating event:', error);
      });
    }
  }

}
