// Import necessary modules from Angular and Ionic
import { Component } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/Services/auth.service'; // Update the path based on your project structure

// Component decorator with metadata
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
// Class definition for the RegisterPage component
export class RegisterPage {

  // Properties to store user registration data
  formattedBornDate: string = '';
  selectedDate: string = '';
  newUser = {
    username: '',
    password: '',
    fullname: '',
    address: '',
    birthDay: new Date().toISOString(),
    phone: '',
    email: '',
  };

  // Constructor with dependency injection
  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {}

  // Method to add a new user
  async addUser() {
    const newUser = {
      userId: 0, // Provide a unique userId (you can generate it based on your logic)
      username: this.newUser.username,
      password: this.newUser.password,
    };

    try {
      // Call the AuthService method to add a new user
      await this.authService.addUser(newUser);
      // Process the user data as needed
      this.openToast('success', 'User added successfully');
      this.navCtrl.navigateRoot('/login');
    } catch (error) {
      console.error('Error adding user:', error);
      this.openToast('error', 'Error adding user');
      // Handle the error (show an error message, etc.)
    }
  }

  // Method to display a toast message
  async openToast(msg: string, titre: string) {
    const loader = await this.loadingCtrl.create({
      duration: 2000,
    });

    loader.present();
    loader.onWillDismiss().then(async () => {
      const toast = await this.toastCtrl.create({
        message: titre,
        animated: true,
        position: 'top',
        duration: 2000,
        cssClass: msg,
      });
      toast.present();
      toast.onDidDismiss().then(() => {});
    });
  }

  // Method to update the selected date
  updateSelectedDate() {
    const selectedDate = new Date(this.newUser.birthDay);
    this.formattedBornDate = this.formatDate(selectedDate);
    console.log('formattedBornDate:', this.formattedBornDate);
  }

  // Method to format a date as a string
  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}
