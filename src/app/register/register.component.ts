import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    if (this.authService.register(this.email, this.password)) {
      this.successMessage = 'Inscription réussie ! Vous pouvez maintenant vous connecter.';
      setTimeout(() => this.router.navigate(['/login']), 2000); // Redirect after 2 seconds
    } else {
      this.errorMessage = 'Un utilisateur avec cet email existe déjà.';
    }
  }
}
