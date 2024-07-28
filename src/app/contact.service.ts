import { Injectable } from '@angular/core';
import { Contact } from './models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactsKey = 'contacts';
  constructor() { }

  getContacts(userId: string): Contact[] {
    const contacts = JSON.parse(localStorage.getItem(this.contactsKey) || '[]');
    return contacts.filter((contact: Contact) => contact.createdBy === userId);
  }

}
