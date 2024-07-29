
// import { ApplicationConfig } from '@angular/core';
// import { routes } from './app.routes';
import { Route,provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './login/login.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { TrashComponent } from './trash/trash.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';


const routes: Route[] = [
  { path: 'contacts', component: ContactListComponent },
  { path: 'add-contact', component: ContactFormComponent },
  { path: 'contact-detail/:id', component: ContactDetailComponent },
  { path: 'edit-contact/:id', component: EditContactComponent },
  { path: 'trash', component: TrashComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

export const appConfig = {
  providers: [
    provideRouter(routes)
  ]
};




