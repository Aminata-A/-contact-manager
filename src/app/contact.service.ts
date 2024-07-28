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


      // Méthode pour mettre à jour un contact
      updateContact(updatedContact: Contact): void {
        console.log('updateContact appelé avec:', updatedContact); // Log pour déboguer
        const contacts = JSON.parse(localStorage.getItem(this.contactsKey) || '[]');
        
        // Trouver l'index du contact à mettre à jour
        const index = contacts.findIndex((contact: Contact) => contact.id === updatedContact.id);
        
        if (index !== -1) {
          contacts[index] = updatedContact;
          localStorage.setItem(this.contactsKey, JSON.stringify(contacts));
          console.log('Contact mis à jour dans localStorage:', contacts); // Log pour vérifier
        } else {
          console.warn('Contact non trouvé pour mise à jour:', updatedContact.id); // Log pour déboguer
        }
      }
}
