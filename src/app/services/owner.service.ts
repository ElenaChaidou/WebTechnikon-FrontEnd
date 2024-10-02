import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  http = inject(HttpClient);

  url = 'http://localhost:8080/WebTechnikon/resources/owners'; 

  getOwners() {
    
    return this.http.get(this.url);
  }

  
  url2 = 'http://localhost:8080/WebTechnikon/resources/owners/{id}';
  getOwnerById(id: number) {
    
    const urlWithId = this.url2.replace('{id}', id.toString());
    return this.http.get(urlWithId);
  }

  private apiUrl = 'http://localhost:8080/WebTechnikon/resources/admin/createOwners';
  createOwner(ownerData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/owners`, ownerData);
  }
  private delUrl = 'http://localhost:8080/WebTechnikon/resources/admin/owner';
  deleteOwner(id: number): Observable<any> {
    return this.http.delete(`${this.delUrl}/${id}`);
  }
}
