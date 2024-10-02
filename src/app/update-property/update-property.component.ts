import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OwnerService } from '../services/owner.service';
import { CommonModule } from '@angular/common';
import { OwnerHomeComponent } from '../owner-home/owner-home.component';

@Component({
  selector: 'app-update-property',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, OwnerHomeComponent],
  templateUrl: './update-property.component.html',
  styleUrls: ['./update-property.component.css']
})
export class UpdatePropertyComponent implements OnInit {
  propertyForm!: FormGroup;
  fb = inject(FormBuilder);
  service = inject(OwnerService);
  propertyId!: number; // This will hold the ID of the property to be updated

  ngOnInit(): void {
    this.initializeForm();
  }

  // Initialize the reactive form
  initializeForm(): void {
    this.propertyForm = this.fb.group({
      propertyId: ['', Validators.required], // Property ID
      address: ['', Validators.required], // Address
      yearOfConstruction: ['', [Validators.required, Validators.min(1800)]], // Year of construction
      propertyType: ['', Validators.required], // Property type
    });
  }

  // Fetch property details based on the propertyId
  fetchProperty(): void {
    this.propertyId = this.propertyForm.value.propertyId; // Get the property ID from the form
    if (this.propertyId) {
      this.service.getPropertyById(this.propertyId).subscribe({
        next: (data) => {
          // Populate form with fetched data
          this.propertyForm.patchValue(data); // Ensure your data has the correct structure
        },
        error: (error) => {
          console.error('Error fetching property details:', error);
          alert('Couldn\'t fetch property details. Please check the property ID.');
        }
      });
    }
  }

  // Submit updated property data
  updateProperty(): void {
    if (this.propertyForm.valid) {
      const propertyData = {
        propertyId: this.propertyForm.value.propertyId,
        address: this.propertyForm.value.address,
        yearOfConstruction: this.propertyForm.value.yearOfConstruction,
        propertyType: this.propertyForm.value.propertyType,
      };

      // Ensure the propertyId is defined before making the request
      if (!this.propertyId) {
        alert('Property ID is required to update.');
        return;
      }

      this.service.updateProperty(this.propertyId, propertyData).subscribe({
        next: (response) => {
          console.log('Property updated successfully', response);
          alert('Property updated successfully!');
          this.propertyForm.reset(); // Reset the form after submission
        },
        error: (err) => {
          console.error('Error updating property:', err);
          alert('Couldn\'t update the property.');
        }
      });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
