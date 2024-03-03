import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { Events } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  updateEvent(eventId: number, formData: any) {
    throw new Error('Method not implemented.');
  }

  api = 'http://10.130.148.149:8000/event/';
  event : Events[] = []
  constructor(private routerservice :  Router,private http : HttpClient) { }

  // addEvent(formData: any): Observable<Events> {
  //   console.log(formData);
    
  //   return this.http.post<Events>(this.api, formData);
  //   // this.routerservice.navigate(['/admin']); 
  // }

  addEvent(formData: any): Observable<Events> {
    console.log(formData);
    return this.http.post<Events>(this.api, formData).pipe(
      catchError((error: any) => {
        console.error('Error adding event:', error);
        // Handle error appropriately, e.g., display error message to the user
        this.routerservice.navigate(['/admin']);
        return throwError(error);
      })
    );
  }

  getAllEvents() : Observable<Events[]>{
    return this.http.get<Events[]>(this.api);
  }

  getEventById(id:number) : Observable<Events[]>{
    return this.http.get<Events[]>(this.api + id+'/');
  }

  upEvent(id: number, data: Events): Observable<Events[]> {
    return this.http.put<Events[]>(`${this.api}/${id}`, data);
    // return this.http.put<Events>(`${this.api}/${id}`, data);
  }

  deleteEvent(id : number):Observable<Events[]>{
    return this.http.delete<Events[]>(`${this.api}/${id}`);
  }
 
}
