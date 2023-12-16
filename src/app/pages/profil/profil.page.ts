// Import necessary modules from Angular
import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

// Component decorator with metadata
@Component({
  selector: 'app-profil',
  templateUrl: 'profil.page.html',
  styleUrls: ['profil.page.scss'], // Add if you have a separate stylesheet
})
// Class definition for the ProfilPage component
export class ProfilPage {
  // Declare variables to bind to the template
  username: string = '';
  email: string = '';
  fullname: string = '';
  address: string = '';
  formattedBornDate: string = ''; // Adjust the type based on your actual user model
  phone: string = '';

  // Constructor with dependency injection
  constructor(private authService: AuthService) {
    // Fetch user data when the page is initialized
    this.fetchUserData();
  }

  // Function to fetch user data using the authService
  fetchUserData() {
    // Get authenticated user ID from the authService
    const userId: number | null = this.authService.getAuthenticatedUserId();
    
    // Fetch user data using the authService based on the authenticated user ID
    const user = this.authService.getUserById(1); // Replace with the actual user ID

    // Update template variables with user data
    if (user) {
      this.username = user.username || '';
      this.email = user.email || ''; 
      this.address = user.address || '';
      this.fullname = user.fullname || '';
      // Format 'birthDay' differently if needed
      this.formattedBornDate = user.birthDay ? this.formatBirthDay(user.birthDay) : '';
      this.phone = user.phone || '';
    }
  }

  // Method to format the birthDay
  private formatBirthDay(birthDay: string): string {
    // Add your custom formatting logic here
    // For example, return a formatted date string
    return birthDay;
  }
}
