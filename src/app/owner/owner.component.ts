import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OwnerService } from '../services/owner.service';
import { JsonPipe } from '@angular/common';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-owner',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, CommonModule], 
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
  ownerForm!: FormGroup; 
  fb = inject(FormBuilder);
  service = inject(OwnerService);
  owners: any;
  ownerById: any;

  ngOnInit(): void {
    this.initializeForm(); 
    this.getOwners();
  }

  initializeForm(): void {
    this.ownerForm = this.fb.group({
      ownerId: ['', Validators.required], 
    });
  }

  getOwners(): void {
    this.service.getOwners().subscribe({
      next: response => this.owners = response,
      error: err => console.error(`Something went wrong: ${err}`)
    });
  }

  searchOwner(): void {
    const id = this.ownerForm.value.ownerId; 
    this.searchOwnerById(id); 
  }

  searchOwnerById(id: number): void {
    this.service.getOwnerById(id).subscribe({
      next: response => this.ownerById = response,
      error: err => console.error(`Something went wrong: ${err}`)
    });
  }
}
