import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CityDetails, WeatherDetails } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
 
  // API details Global
  readonly weatherAPI:string ='https://api.open-meteo.com/v1/forecast'
  readonly cityNameAPI:string ='https://geocoding-api.open-meteo.com/v1/search'

  // API Details Local
  readonly weatherAPILocal:string ='https://localhost:7189/WeatherForecast/getWeatherData'
  readonly cityNameAPILocal:string ='https://localhost:7189/WeatherForecast/GetCityDetails'
  constructor(private _http: HttpClient) { }
  
  getWeatherData(lati:string,long:string):Observable<WeatherDetails>{
    return this._http.get<WeatherDetails>(this.weatherAPI,{
      params: new HttpParams()
      .set('latitude',lati)
      .set('longitude',long)
      .set('hourly','temperature_2m,relativehumidity_2m,windspeed_10m,apparent_temperature,snowfall')
    })
  }

  getCityName(name:string):Observable<CityDetails>{
    if (name && name.length > 3){
      return this._http.get<CityDetails>(this.cityNameAPI,{
        params:new HttpParams()
        .set('name',name)
      })  
    }
    return of<CityDetails>()
  }
}
