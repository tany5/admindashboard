import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpHandler, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  readonly ROOT_URL
  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://localhost/avisionEstore/index.php/api/"
   }

   get(uri: string, headers: HttpHeaders) {     
    return  this.http.get(`${this.ROOT_URL}/${uri}`, {headers})
   }

  POST(uri: string, payload: Object, headers: HttpHeaders) {    
    return this.http.post(`${this.ROOT_URL}${uri}`, payload, { headers})
   }

   post(uri: string, payload: Object, headers: HttpHeaders) {
    return this.http.post(`${this.ROOT_URL}${uri}`, payload, { headers, reportProgress: true,
      observe: 'events'})
   }
   
   delete(uri: string, headers: HttpHeaders) {
     return this.http.delete(`${this.ROOT_URL}/${uri}`, {headers})
   }

   patch(uri: string, payload: Object, headers: HttpHeaders) {
     return this.http.patch(`${this.ROOT_URL}/${uri}`, payload, { reportProgress: true, observe: 'events', headers})
   }

   api(uri: string, headers: HttpHeaders) {
    return  this.http.get(`${uri}`, {headers})
   }
}
