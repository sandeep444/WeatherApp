import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { WeatherDashBoardComponent } from './weather-dashboard/weather-dash-board.component';

const routes: Routes = [ 
  {path:'weather',component:WeatherDashBoardComponent},
  {path:'**',redirectTo:'weather'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

 
 }
