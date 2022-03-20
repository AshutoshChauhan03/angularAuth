import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private _http: HttpClient) { }

  getEvents() {
    let url = "http://localhost:3000/events"
    return this._http.get<any>(url);
  }

  getSpecials() {
    let url = "http://localhost:3000/specials"
    return this._http.get<any>(url);
  }
}
