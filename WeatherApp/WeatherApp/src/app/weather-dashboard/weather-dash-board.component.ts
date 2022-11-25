import { Component, NgZone } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CityDetails, HourlyUnits, Result, WeatherDetails } from '../models/weather.model';
import { WeatherService } from '../services/weather.service';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-weather-dash-board',
  templateUrl: './weather-dash-board.component.html',
  styleUrls: ['./weather-dash-board.component.css']
})
export class WeatherDashBoardComponent {

  public minTemp : string ='';
  public feelsLikeTemp : string ='';
  public windSpeed : string ='';
  public humidity : string ='';
  public snowFall:string = ''   
  public cityName:string='Toronto';

  myControl = new FormControl();
  options = [];
  filteredOptions: Observable<Result[]>;

  constructor(private weatherService: WeatherService,private router: Router,
    private service: AuthService,
    private _ngZone: NgZone){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
            return this.filter(this.myControl.value)
       }) 
    )
  }

  private getWeatherData(lati:string,long:string) {
    this.weatherService.getWeatherData(lati,long)
   .subscribe({
    next:(response) => {
      this.getDisplayData(response);
    }
   })
  }

  private getDisplayData(response : WeatherDetails) {
    if(response && response.hourly){
      var data = response.hourly;
      if(data) {
        this.minTemp = data.temperature_2m[0].toString();
        this.feelsLikeTemp = data.apparent_temperature[0].toString();
        this.windSpeed = data.windspeed_10m[0].toString();
        this.humidity = data.relativehumidity_2m[0].toString();
        this.snowFall = data.snowfall[0].toString();
      }
    }
  }

  filter(val: string): Observable<Result[]> {   
    return this.weatherService.getCityName(val)
     .pipe(
       map(response => response.results)
     )
   }  

   public citySelected(event:any, option:any) {
     if(option && option.latitude && option.longitude){
      this.getWeatherData(option.latitude,option.longitude)
     } else {
      alert("Please select the city name")
     }
  }

  public logout(){
    this.service.signOutExternal();
    localStorage.clear();
    this._ngZone.run(() => {
      this.router.navigate(['/']).then(() => window.location.reload());
    })
  }

}
