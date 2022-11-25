
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private path = 'https://localhost:7189/'
  constructor(private httpClient: HttpClient) { }
  public signOutExternal = () => {
    localStorage.removeItem("token");
    console.log("token deleted")
}

LoginWithGoogle(credentials: string): Observable<any> {
  const header = new HttpHeaders().set('Content-type', 'application/json');
  var body ={"key":credentials}
  return this.httpClient.post(this.path + "Auth/LoginWithGoogle", JSON.stringify(body), { headers: header });
}

}
