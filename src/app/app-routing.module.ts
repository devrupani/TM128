import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { AddEventComponent } from './admin/add-event/add-event.component';
import { EachEventComponent } from './admin/add-event/each-event/each-event.component';
import { EditEventComponent } from './admin/add-event/each-event/edit-event/edit-event.component';
import { NotFoundComponent } from './admin/not-found/not-found.component';



const routes: Routes = [
  
  {path : '',redirectTo :  'admin',pathMatch : 'full'},
  {path : 'admin',component : HomeComponent},
  {path : 'admin/add-event',component : AddEventComponent},
  {path : 'event/:id',component : EachEventComponent},
  {path : 'edit-event/:id',component : EditEventComponent},
  {path : '**', component : NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
