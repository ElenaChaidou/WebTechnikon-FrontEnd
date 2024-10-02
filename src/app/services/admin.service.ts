import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  http = inject(HttpClient);

  private baseUrl = 'http://localhost:8080/WebTechnikon/resources/admin'; 

  
  getActiveRepairs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/active-repairs`);
  }

 
  getPendingRepairs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/repairs/pending`);
  }
}
