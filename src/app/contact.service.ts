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


  addContact(contact: Contact): void {
    console.log('addContact appelé avec:', contact); // Log pour déboguer
    const contacts = JSON.parse(localStorage.getItem(this.contactsKey) || '[]');
    contacts.push(contact);
    localStorage.setItem(this.contactsKey, JSON.stringify(contacts));
    console.log('Contact ajouté à localStorage:', contacts); // Log pour vérifier
  }
}
