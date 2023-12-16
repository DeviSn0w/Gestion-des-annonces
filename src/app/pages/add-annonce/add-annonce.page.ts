// Import necessary modules from Angular and Ionic
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { AnnonceService } from 'src/app/Services/annonce.service';

// Component decorator with metadata
@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.page.html',
  styleUrls: ['./add-annonce.page.scss'],
})
// Class definition for the AddAnnoncePage component
export class AddAnnoncePage implements OnInit {
  annonceForm!: FormGroup; // Add the definite assignment assertion modifier
  annonces: any[] = [];

  // Constructor with dependency injection
  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private annonceService: AnnonceService,
    private toastController: ToastController
  ) {
    this.initializeForm();
  }
  ngOnInit() {
    this.loadAnnonces();
    // other initialization code...
  }
  // Method to initialize the form with default values and validators
  initializeForm() {
    this.annonceForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      imageUrl: [''],
    });
  }

  // Method to display a toast message
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duration in milliseconds
      color: color, // Use Ionic colors: 'primary', 'secondary', 'success', 'warning', 'danger', etc.
      position: 'top', // You can adjust the position (top, middle, or bottom)
    });
    toast.present();
  }

  // Method to add an announcement
  addAnnonce() {
    if (this.annonceForm.valid) {
      const formData = this.annonceForm.value;
  
      // Add more properties if needed
      formData.creationDate = new Date();
      formData.isActive = true;
  
      // Call the service to add the announcement
      this.annonceService.addAnnonce(formData);
  
      // Display a success toast
      this.presentToast('Announcement added successfully', 'success');
  
      // Log to console
      console.log('Announcement added:', formData);
  
      // Navigate back to the 'annonces' page
      this.navCtrl.navigateBack('/annonces');
    } else {
      this.presentToast('Invalid form data', 'danger');
    }
  }
  
  // Inside AnnoncesPage component
loadAnnonces() {
  this.annonces = this.annonceService.getAnnonces();
}

  // Method to handle file change and update the imageUrl in the form
  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        // Update the form control value with the file name/path
        this.annonceForm.patchValue({
          imageUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  }
}
