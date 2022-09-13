import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '@core/models/contact';
import { environment } from 'src/environments/environment';

const API_URL: string = `${environment.api.contact}`;

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
    let params: HttpParams = new HttpParams()
      .set('name', contact.name)
      .set('email', contact.email)
      .set('subject', contact.subject)
      .set('message', contact.message);

    // Add options
    const options = { params: params };

    return this.http.post<Contact>(API_URL, contact, options);
  }
}
