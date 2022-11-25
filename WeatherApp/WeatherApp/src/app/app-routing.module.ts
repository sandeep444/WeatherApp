import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { AuthGuard } from './common/auth.guard';
import { LoginComponent } from './login/login.component';
import { WeatherDashBoardComponent } from './weather-dashboard/weather-dash-board.component';

const routes: Routes = [ 
  {path:'', component:LoginComponent,pathMatch:'full'},
  {path:'weather',component:WeatherDashBoardComponent, canActivate: [AuthGuard]},
  {path:'**',redirectTo:''}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

 
 }
