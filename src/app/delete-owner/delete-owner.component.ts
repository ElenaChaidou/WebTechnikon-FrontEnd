import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { OwnerService } from '../services/owner.service';
import { OwnerHomeComponent } from '../owner-home/owner-home.component';

@Component({
  selector: 'app-delete-owner',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, OwnerHomeComponent], // Add CommonModule here
  templateUrl: './delete-owner.component.html',
  styleUrls: ['./delete-owner.component.css']
})
export class DeleteOwnerComponent {
  ownerForm!: FormGroup;
  ownerDetails: any;
  fb = inject(FormBuilder);
  service = inject(OwnerService);

  constructor() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.ownerForm = this.fb.group({
      ownerId: ['', Validators.required] 
    });
  }

  getOwnerDetails(): void {
    const ownerId = this.ownerForm.value.ownerId;
    this.service.getOwnerById(ownerId).subscribe({
      next: (response) => {
        this.ownerDetails = response;
        console.log('Owner Details:', this.ownerDetails);
      },
      error: (err) => {
        console.error('Error fetching owner details:', err);
        alert('Error fetching owner details. Please check the ID.');
      }
    });
  }


  deleteOwner(): void {
    const ownerId = this.ownerForm.value.ownerId;
    this.service.deleteOwner(ownerId).subscribe({
      next: (response) => {
        console.log('Owner deleted successfully:', response);
        alert('Owner deleted successfully');
        this.ownerDetails = null; 
        this.ownerForm.reset(); 
      },
      error: (err) => {
        console.error('Error deleting owner:', err);
        alert('Error deleting owner. Please try again.');
      }
    });
  }
}
