import { Injectable } from '@angular/core';
import { Contact } from './models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactsKey = 'contacts';
  private trashKey = 'trash';
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
        const contacts = JSON.parse(localStorage.getItem(this.contactsKey) || '[]');
        const index = contacts.findIndex((contact: Contact) => contact.id === updatedContact.id);
        if (index !== -1) {
          contacts[index] = updatedContact;
          localStorage.setItem(this.contactsKey, JSON.stringify(contacts));
        }
      }

          // Méthode pour supprimer un contact
          deleteContact(contactId: string): void {
            let contacts = JSON.parse(localStorage.getItem(this.contactsKey) || '[]');
            const contact = contacts.find((c: Contact) => c.id === contactId);
            if (contact) {
              contacts = contacts.filter((c: Contact) => c.id !== contactId);
              localStorage.setItem(this.contactsKey, JSON.stringify(contacts));
              
              const trash = JSON.parse(localStorage.getItem(this.trashKey) || '[]');
              trash.push(contact);
              localStorage.setItem(this.trashKey, JSON.stringify(trash));
            }
          }
        
}
