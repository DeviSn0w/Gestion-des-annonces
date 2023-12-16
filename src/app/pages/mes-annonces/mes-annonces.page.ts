// Import necessary modules from Angular
import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/app/Services/annonce.service';

// Component decorator with metadata
@Component({
  selector: 'app-mes-annonces',
  templateUrl: './mes-annonces.page.html',
  styleUrls: ['./mes-annonces.page.scss'],
})
// Class definition for the MesAnnoncesPage component
export class MesAnnoncesPage implements OnInit {
  mesAnnonces: any[] = []; // Property to store the user's annonces

  // Constructor with dependency injection
  constructor(private annonceService: AnnonceService) { }

  // Lifecycle hook called after component initialization
  ngOnInit() {
    // Fetch the user's annonces when the page is about to enter
    this.fetchMesAnnonces();
  }

  // Function to handle the refresh event
  handleRefresh(event: any): void {
    // Simulate an API call or data loading
    this.loadData()
      .then(() => {
        // Complete the refresh
        event.target.complete();
      })
      .catch(() => {
        // Handle errors if necessary
        event.target.complete();
      });
  }

  // Simulated data loading (replace this with your actual data loading logic)
  loadData(): Promise<void> {
    return new Promise(resolve => {
      // Simulate a delay
      setTimeout(() => {
        // Your actual data loading logic goes here
        console.log('Data loaded');

        // Resolve the Promise to indicate that data loading is complete
        resolve();
      }, 2000); // Simulated delay of 2 seconds
    });
  }

  // Function to fetch the user's annonces from the service
  private fetchMesAnnonces() {
    const utilisateurId = 1; // replace with the authenticated user's ID
    this.mesAnnonces = this.annonceService.getMesAnnonces(utilisateurId);
  }
}
