// Import necessary modules from Angular
import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/app/Services/annonce.service';
import { Annonce } from 'src/app/models/annonce.model';

// Component decorator with metadata
@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.page.html',
  styleUrls: ['./annonces.page.scss'],
})
// Class definition for the AnnoncesPage component
export class AnnoncesPage implements OnInit {
  selectedCategory: string = ''; // Property to store the selected category
  annonces: any[] = []; // Property to store all annonces
  filteredAnnonces: any[] = []; // Property to store filtered annonces
  searchText: string = ''; // Property to store the search text

  // Constructor with dependency injection
  constructor(private annonceService: AnnonceService) { }

  // Lifecycle hook called after component initialization
  ngOnInit() {
    this.filterByCategory(); // Initial filter
    // Fetch ad data when the page is about to enter
    this.loadAnnonces();
    this.searchAnnonces(); // Add this line to ensure all annonces are displayed initially
  }
  // Function to load annonces
  loadAnnonces() {
    this.annonces = this.annonceService.getAnnonces(); // Fetch ad data from the service
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

  // Function to filter annonces by category
  filterByCategory(): void {
    if (this.selectedCategory === 'All' && !this.searchText.trim()) {
      // If 'All' category is selected and no search text, show all annonces
      this.filteredAnnonces = this.annonces.slice();
    } else if (this.selectedCategory === 'Vehicule' || this.selectedCategory === 'Immobilier') {
      // If 'Vehicule' or 'Immobilier' category is selected, filter annonces by category
      this.filteredAnnonces = this.annonces.filter((annonce: any) => {
        return (
          annonce.category === this.selectedCategory &&
          (this.searchText.trim() === '' ||
            (annonce.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
              annonce.description.toLowerCase().includes(this.searchText.toLowerCase())))
        );
      });
    } else {
      // Handle the case when no category is selected, show all annonces
      this.filteredAnnonces = this.annonces.slice();
    }
  }
  
  // Function to search annonces based on the provided search text
  searchAnnonces(): void {
    if (this.searchText.trim() === '') {
      this.filteredAnnonces = this.annonces.slice(); // Show all annonces when search is cleared
    } else {
      // Implement the search logic based on your requirements
      this.filteredAnnonces = this.annonces.filter((annonce: any) => {
        const a = annonce as {
          title: string,
          description: string,
        };
  
        const matchesSearchText =
          a.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
          a.description.toLowerCase().includes(this.searchText.toLowerCase());
  
        return matchesSearchText;
      });
    }
  
    console.log('Filtered Annonces:', this.filteredAnnonces);
  }
  
}
