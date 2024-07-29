import { Injectable } from '@angular/core';
import { User } from './models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserKey = 'currentUser';
  private usersKey = 'users'; // Key to store all registered users
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public loggedIn$ = this.loggedInSubject.asObservable();

  constructor() {
    // Initialize with empty users array if not present in local storage
    if (!localStorage.getItem(this.usersKey)) {
      localStorage.setItem(this.usersKey, JSON.stringify([]));
    }
  }

  register(email: string, password: string): boolean {
    const users = this.getUsers();
    if (users.find(u => u.email === email)) {
      return false; // User already exists
    }
    const newUser: User = { id: this.generateId(), email, password };
    users.push(newUser);
    this.setUsers(users);
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      this.setCurrentUser(user);
      this.loggedInSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
    this.loggedInSubject.next(false);
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.currentUserKey);
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  private isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  private getUsers(): User[] {
    const usersJson = localStorage.getItem(this.usersKey);
    if (usersJson) {
      return JSON.parse(usersJson);
    }
    return [];
  }

  private setUsers(users: User[]): void {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  private generateId(): string {
    return (Math.random() * 1e6).toFixed(0); // Simple ID generation for demonstration
  }
}
