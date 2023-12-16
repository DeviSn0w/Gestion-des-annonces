// Import necessary modules from Angular core
import { Component, OnInit } from '@angular/core';
// Import the AuthService to manage authentication
import { AuthService } from './Services/auth.service';

// Component decorator with metadata
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
// Class definition implementing OnInit interface
export class AppComponent implements OnInit {
  // Flag to track user login status
  isLoggedIn: boolean = false;

  // Navigation links for the app
  public appPages = [
    { title: 'Annoncy', url: 'annonces', icon: 'home' },
    { title: 'Nouvelle Annonce', url: 'add-annonce', icon: 'desktop' },
    { title: 'Mes Annonce', url: 'mes-annonces', icon: 'heart' },
    { title: 'Profil', url: 'profil', icon: 'person' },
  ];

  // Additional labels, e.g., for logout
  public labels = [
    { title: 'Déconnexion', url: '/login', icon: 'exit' },
  ];

  // Constructor with AuthService dependency injection
  constructor(private authService: AuthService) {}

  // Lifecycle hook - ngOnInit
  ngOnInit() {
    // Subscribe to the isLoggedIn$ observable to update login status
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  // Method to handle logout event
  logout(ev: any) {
    // Check if the logout event is triggered from the specified URL
    if (ev === '/login') {
      // Clear local storage and update the logged-in status
      localStorage.clear();
      this.authService.updateLoggedInStatus(false);
    }
  }
}
