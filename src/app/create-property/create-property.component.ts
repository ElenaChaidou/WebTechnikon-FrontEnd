import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OwnerService } from '../services/owner.service';
import { CommonModule } from '@angular/common';
import { OwnerHomeComponent } from '../owner-home/owner-home.component';

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, OwnerHomeComponent],
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

  initializeForm(): void {
    this.propertyForm = this.fb.group({
      ownerId: ['', Validators.required], 
      propertyCode: ['', Validators.required], 
      address: ['', Validators.required], 
      yearOfConstruction: ['', [Validators.required, Validators.min(1800)]],
      propertyType: ['', Validators.required], 
      e9: ['', Validators.required], 
      deletedProperty: [false] 
    });
  }
  onSubmit(): void {
    if (this.propertyForm.valid) {
      const propertyData = {
        propertyCode: this.propertyForm.value.propertyCode,
        address: this.propertyForm.value.address,
        yearOfConstruction: this.propertyForm.value.yearOfConstruction,
        propertyType: this.propertyForm.value.propertyType,
        e9: this.propertyForm.value.e9,
        deletedProperty: false 
      };

      const ownerId = this.propertyForm.value.ownerId;

      this.service.createPropertyForOwner(ownerId, propertyData).subscribe({
        next: (response) => {
          console.log('Property created successfully', response);
          alert('Property created successfully!');
          this.propertyForm.reset(); 
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
