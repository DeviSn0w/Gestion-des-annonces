// Import necessary modules from Angular
import { Component } from '@angular/core';
import { AnnonceService } from 'src/app/Services/annonce.service';

// Component decorator with metadata
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
// Class definition for the HomePage component
export class HomePage {
  // Property to store data for display on the home page
  // For example, you might fetch data from the service and assign it to this property

  // Constructor with dependency injection
  constructor(private annonceService: AnnonceService) {
    // Initialize or fetch data as needed when the component is created
    // this.loadData();
  }

  // Function to load data for display on the home page
  // loadData() {
  //   // Fetch data from the service and assign it to the property
  //   this.data = this.annonceService.getData();
  // }
}
