import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { AuthService } from '../auth.service';
import { Contact } from '../models/contact';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  searchTerm: string = '';

  constructor(private contactService: ContactService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.contacts = this.contactService.getContacts(currentUser.id);
      console.log(this.contacts); 
    }
  }

  editContact(id: string) {
    this.router.navigate(['/edit-contact', id]);
  }
  onSelect(contact: Contact): void {
    this.router.navigate(['/contact-detail', contact.id]); 
  }

  deleteContact(contactId: string): void {
    console.log('Suppression du contact avec ID:', contactId); 
    this.contactService.deleteContact(contactId);
    this.ngOnInit(); 
  }

  

  searchContacts(): void {
    if (this.searchTerm.trim()) {
      this.contacts = this.contactService.searchContacts(this.searchTerm);
    } else {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
      this.contacts = this.contactService.getContacts(currentUser.id);
      }
    }
  }
}
