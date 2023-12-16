// Import necessary modules from Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AnnonceService } from 'src/app/Services/annonce.service';

// Component decorator with metadata
@Component({
  selector: 'app-annonce-detail',
  templateUrl: './annonce-detail.page.html',
  styleUrls: ['./annonce-detail.page.scss'],
})
// Class definition for the AnnonceDetailPage component
export class AnnonceDetailPage implements OnInit {
  annonce: any; // Property to store the announcement details

  // Constructor with dependency injection
  constructor(private annonceService: AnnonceService, private route: ActivatedRoute) {}

  // Lifecycle hook called after component initialization
  ngOnInit() {
    // Subscribe to route parameter changes
    this.route.paramMap.subscribe((params: ParamMap) => {
      // Get the 'id' parameter from the route
      const id = params.get('id');
      // Check if the 'id' parameter is not null
      if (id !== null) {
        // Get the announcement details by calling the service method
        this.annonce = this.annonceService.getAnnouncementById(+id);
      }
    });
  }
}
