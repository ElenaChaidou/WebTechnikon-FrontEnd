import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OwnerService } from '../services/owner.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-owner',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
    newOwner = {
      password: '',
      propertyList: [
        {
          propertyCode: null,
          address: '',
          yearOfConstruction: null,
          propertyType: '',
          e9: null
        }
      ],
      deletedOwner: false,
      username: '',
      address: '',
      surName: '',
      email: '',
      vatNumber: null,
      phoneNumber: '',
      name: ''
    };

  service = inject(OwnerService); 
  ownerForm!: FormGroup;

  fb = inject(FormBuilder); 

  owners: any;  
  ownerById: any;

  ngOnInit(): void {
    this.service.getOwners().subscribe({
      next: response => this.owners = response,
      error: err => console.error(`Something went wrong: ${err}`)
    });
    this.searchOwnerById(1);
  }

  searchOwnerById(id: number): void {
    this.service.getOwnerById(id).subscribe({
      next: response => this.ownerById = response,  
      error: err => console.error(`Something went wrong: ${err}`)
    });
  }

  initializeForm(): void {
    this.ownerForm = this.fb.group({
      name: ['', Validators.required],
      surName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.pattern("^[a-zA-Z0-9@]+$")]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      vatNumber: ['', Validators.required],
      propertyCode: ['', Validators.required],
      propertyAddress: ['', Validators.required],
      yearOfConstruction: ['', Validators.required],
      propertyType: ['', Validators.required],
      e9: ['', Validators.required]
    });
  }

  createOwner(): void {
    if (this.ownerForm.valid) {
      this.service.createOwner(this.ownerForm.value).subscribe({
        next: response => {
          console.log('Owner created successfully', response);
          alert('Owner created successfully');
          this.ownerForm.reset(); 
        },
        error: err => {
          console.error('Error creating owner', err);
          alert('Error creating owner');
        }
      });
    } else {
      console.log('Form is invalid', this.ownerForm.errors);
    }
  }

}
