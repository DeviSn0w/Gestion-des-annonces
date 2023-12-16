// Import necessary modules from Angular core and other services
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

// Injectable decorator to mark the service as injectable and provide it in the root injector
@Injectable({
  providedIn: 'root',
})
export class AnnonceService {
  // BehaviorSubject to manage the list of announcements
  private annoncesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  annonces$ = this.annoncesSubject.asObservable();

  // Initial set of static announcements
  private annonces = [
    // Sample announcement 1
    {
      id: 1,
      userId: 1,
      title: 'Villa Rose',
      description: 'Description de l\'annonce 1',
      price: 100,
      category: 'Immobilier',
      isActive: true,
      creationDate: new Date(),
      imageUrl: 'assets/image/annonce/A1.jpg'
    },
    // Sample announcement 2
    {
      id: 2,
      userId: 2,
      title: 'Annonce 2',
      description: 'Description de l\'annonce 2',
      price: 200,
      category: 'Vehicule',
      isActive: true,
      creationDate: new Date(),
      imageUrl: 'assets/image/annonce/A2.png'
    },
    // Add more static announcements here
  ];

  // Constructor with AuthService dependency injection
  constructor(private authService: AuthService) {
    this.updateAnnouncements(); // Initialize with existing announcements
  }

  // Private method to update announcements based on the authenticated user
  private updateAnnouncements() {
    const utilisateurId = this.authService.getAuthenticatedUserId();
    if (utilisateurId !== null) {
      const userAnnouncements = this.annonces.filter(annonce => annonce.userId === utilisateurId);
      this.annoncesSubject.next(userAnnouncements);
    }
  }

  // Public method to get all announcements
  getAnnonces() {
    return this.annonces;
  }

  // Public method to get announcements specific to a user
  getMesAnnonces(utilisateurId: number): any[] {
    if (utilisateurId !== null) {
      return this.annonces.filter(annonce => annonce.userId === utilisateurId);
    }
    return [];
  }

  // Public method to get an announcement by its ID
  getAnnouncementById(id: number | null): any {
    if (id !== null) {
      return this.annonces.find(annonce => annonce.id === id);
    }
    return null;
  }

  // Public method to add a new announcement
  addAnnonce(annonce: any) {
    const newId = Math.max(...this.annonces.map(item => item.id), 0) + 1;
    const utilisateurId = this.authService.getAuthenticatedUserId();
    if (utilisateurId !== null) {
      annonce.id = newId;
      annonce.userId = utilisateurId;
      this.annonces.push(annonce);
    }
  }

  // Public method to get announcements based on category
  getAnnoncesByCategory(category: string): any[] {
    // Filter announcements based on the specified category
    return this.annonces.filter(annonce => annonce.category === category);
  }
}
