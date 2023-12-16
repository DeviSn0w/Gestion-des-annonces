// Import necessary modules from Angular and Ionic
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service'; // Update the path based on your project structure
import { ToastController } from '@ionic/angular';

// Component decorator with metadata
@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
// Class definition for the LoginPage component
export class LoginPage {
  // Object to store user login credentials
  credentials = { username: '', password: '' };

  // Constructor with dependency injection
  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  // Method to handle user login
  login() {
    this.authService.login(this.credentials).subscribe(
      (success: boolean) => {
        if (success) {
          // Navigate to the home page on successful login
          this.navCtrl.navigateRoot('/annonces');
        } else {
          // Show a toast for invalid credentials
          this.presentToast('Invalid credentials');
        }
      },
      (error: any) => {
        console.error('Login Error:', error);
        // Handle login error (show an error message, etc.)
      }
    );
  }
  
  // Method to display a toast message
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Display the toast for 3 seconds
      position: 'top' // You can adjust the position (top, middle, or bottom)
    });
    toast.present();
  }
}
