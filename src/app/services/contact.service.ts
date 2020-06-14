import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl = 'http://localhost:3000/';
  constructor(public http: HttpClient) { }
  postData( formData ){
    return this.http.post( this.baseUrl + 'contacts/', { contact: formData });
  }
}
