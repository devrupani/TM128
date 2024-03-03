import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Events } from 'src/app/model/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  event : Events[] = []
  eventForm!: FormGroup;


  constructor(private formBuilder: FormBuilder, private eventService : EventService) { }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      venue: ['', Validators.required],
      date: ['', Validators.required],
      event_category: ['', Validators.required]
    });
  }
  


  onSubmit() {
    const formData = this.eventForm.value;
    // console.log(formData);
    
    this.eventService.addEvent(formData).subscribe(
      (response) => {     
        console.log('Event added successfully:', response);
      },
      (error) => {
        console.error('Error adding event:', error);
      }
    );
  }
  
  
}


