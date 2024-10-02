import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service'; // Adjust the import path as needed
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AdminHomeComponent } from '../admin-home/admin-home.component';

@Component({
  selector: 'app-repairs',
  standalone: true, // Indicate it's a standalone component
  imports: [CommonModule, AdminHomeComponent], // Import CommonModule here
  templateUrl: './repairs.component.html',
  styleUrls: ['./repairs.component.css']
})
export class RepairsComponent implements OnInit {
  repairs: any[] = []; // Array to hold the active repairs
  adminService = inject(AdminService);

  ngOnInit(): void {
    this.getActiveRepairs(); // Fetch active repairs on component initialization
  }

  // Fetch the active repairs from the service
  getActiveRepairs(): void {
    this.adminService.getPendingRepairs().subscribe({
      next: (data) => {
        this.repairs = data; // Set the repairs data
      },
      error: (err) => {
        console.error('Error fetching active repairs:', err);
        alert('Could not fetch active repairs. Please try again later.');
      }
    });
  }
}
