import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service'; 
import { CommonModule } from '@angular/common'; 
import { AdminHomeComponent } from '../admin-home/admin-home.component';

@Component({
  selector: 'app-repairs',
  standalone: true, 
  imports: [CommonModule, AdminHomeComponent], 
  templateUrl: './repairs.component.html',
  styleUrls: ['./repairs.component.css']
})
export class RepairsComponent implements OnInit {
  activeRepairs: any[] = [];  
  pendingRepairs: any[] = [];  
  adminService = inject(AdminService);

  ngOnInit(): void {
    this.getActiveRepairs(); 
    this.getPendingRepairs(); 
  }

  getActiveRepairs(): void {
    this.adminService.getActiveRepairs().subscribe({
      next: (data) => {
        this.activeRepairs = data; 
      },
      error: (err) => {
        console.error('Error fetching active repairs:', err);
        alert('Could not fetch active repairs. Please try again later.');
      }
    });
  }

  getPendingRepairs(): void {
    this.adminService.getPendingRepairs().subscribe({
      next: (data) => {
        this.pendingRepairs = data; 
      },
      error: (err) => {
        console.error('Error fetching pending repairs:', err);
        alert('Could not fetch pending repairs. Please try again later.');
      }
    });
  }
}
