import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

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

 
  createOwner(ownerData: any) {
    const createOwnerUrl = 'http://localhost:8080/WebTechnikon/resources/admin/createOwners';
    return this.http.post(createOwnerUrl, ownerData);
  }
}
