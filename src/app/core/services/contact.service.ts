import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '@core/models/contact';
import { api } from 'src/environments/environment.api';

const API_URL: string = `${api.contact}`;

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  /**
  * Send the contact to the form submit api.
  * 
  * @param contact The contact.
  * @returns {Observable<Contact>} The contact.
  */
  sendContact(contact: Contact) {
    // Add parameters
    let params: HttpParams = new HttpParams();

    // Add options
    const options = { params: params };

    return this.http.post<Contact>(API_URL, contact, options);
  }
}
