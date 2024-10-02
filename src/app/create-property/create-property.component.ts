import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OwnerService } from '../services/owner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-property.component.html',
  styleUrls: ['./create-property.component.css']
})
export class CreatePropertyComponent implements OnInit {
  propertyForm!: FormGroup;
  fb = inject(FormBuilder);
  service = inject(OwnerService);

  ngOnInit(): void {
    this.initializeForm();
  }

  // Initialize the reactive form
  initializeForm(): void {
    this.propertyForm = this.fb.group({
      ownerId: ['', Validators.required], // Owner ID
      propertyCode: ['', Validators.required], // Property code
      address: ['', Validators.required], // Address
      yearOfConstruction: ['', [Validators.required, Validators.min(1800)]], // Year of construction
      propertyType: ['', Validators.required], // Property type
      e9: ['', Validators.required], // E9 code
      deletedProperty: [false] // Deleted flag for property
    });
  }

  // Submit property data
  onSubmit(): void {
    if (this.propertyForm.valid) {
      const propertyData = {
        propertyCode: this.propertyForm.value.propertyCode,
        address: this.propertyForm.value.address,
        yearOfConstruction: this.propertyForm.value.yearOfConstruction,
        propertyType: this.propertyForm.value.propertyType,
        e9: this.propertyForm.value.e9,
        deletedProperty: false // Default for new properties
      };

      const ownerId = this.propertyForm.value.ownerId;

      this.service.createPropertyForOwner(ownerId, propertyData).subscribe({
        next: (response) => {
          console.log('Property created successfully', response);
          alert('Property created successfully!');
          this.propertyForm.reset(); // Reset the form after submission
        },
        error: (err) => {
          console.error('Error creating property:', err);
          alert('Couldn\'t create the property.');
        }
      });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
