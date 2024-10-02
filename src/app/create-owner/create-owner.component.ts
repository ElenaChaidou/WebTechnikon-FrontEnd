import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OwnerService } from '../services/owner.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-create-owner',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './create-owner.component.html',
  styleUrls: ['./create-owner.component.css']
})
export class CreateOwnerComponent implements OnInit {
  ownerForm!: FormGroup;
  fb = inject(FormBuilder);
  service = inject(OwnerService);

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.ownerForm = this.fb.group({
      name: ['', Validators.required],
      surName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z0-9@]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      vatNumber: ['', Validators.required],
      propertyCode: ['', Validators.required],
      propertyAddress: ['', Validators.required],
      yearOfConstruction: ['', Validators.required],
      propertyType: ['', Validators.required],
      e9: ['', Validators.required],
      deletedOwner: [false],
      deletedProperty: [false]
    });
  }

  createOwner(): void {
    console.log('Submit button clicked');

    if (this.ownerForm.valid) {
      console.log('Form is valid. Submitting owner data.');

      const newOwnerData = {
        ...this.ownerForm.value,
        propertyList: [
          {
            propertyCode: this.ownerForm.value.propertyCode,
            address: this.ownerForm.value.propertyAddress,
            yearOfConstruction: this.ownerForm.value.yearOfConstruction,
            propertyType: this.ownerForm.value.propertyType,
            e9: this.ownerForm.value.e9,
            deletedProperty: false
          }
        ],
        deletedOwner: false
      };

      console.log('Prepared Owner Data:', newOwnerData);

      this.service.createOwner(newOwnerData).subscribe({
        next: (response) => {
          console.log('Owner created successfully:', response);
          alert('Owner created successfully');
          this.resetForm();
        },
        error: (err) => {
          console.error('Error creating owner:', err);
          if (err.error) {
            console.error('Detailed error:', err.error);
          }
          alert('Error creating owner');
        }
      });
    } else {
      console.log('Form is invalid:', this.ownerForm.errors);
      alert('Form is invalid. Please fill in all required fields.');
    }
  }

  resetForm(): void {
    this.ownerForm.reset({
      deletedOwner: false,
      deletedProperty: false
    });
    this.ownerForm.markAsPristine();
    this.ownerForm.markAsUntouched();
    this.ownerForm.updateValueAndValidity();
  }
}
