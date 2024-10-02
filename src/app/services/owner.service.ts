import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  http = inject(HttpClient);

  private baseUrl = 'http://localhost:8080/WebTechnikon/resources/owners'; 

  getOwners(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getOwnerById(id: number): Observable<any> {
    const urlWithId = `${this.baseUrl}/${id}`; 
    return this.http.get(urlWithId);
  }

  createPropertyForOwner(ownerId: number, propertyData: any): Observable<any> {
    const url = `${this.baseUrl}/${ownerId}/properties`; 
    return this.http.post(url, propertyData); 
  }


  getPropertyById(propertyId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/properties/propertyId/${propertyId}`); 
  }

  // Update property
  updateProperty(propertyId: number, propertyData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/properties/${propertyId}`, propertyData);
  }

  
  deleteOwner(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`; 
    return this.http.delete(url);
  }

}