import { Component } from '@angular/core';
import { AdminHomeComponent } from '../admin-home/admin-home.component';

@Component({
  selector: 'app-admin-welcome',
  standalone: true,
  imports: [AdminHomeComponent],
  templateUrl: './admin-welcome.component.html',
  styleUrl: './admin-welcome.component.css'
})
export class AdminWelcomeComponent {
  adminName: string;
  
  constructor() {
    
    this.adminName = 'Elena'; 
  }


  navigateTo(destination: string): void {
    console.log(`Navigating to ${destination}`);
  }

  logout(): void {
    console.log('Logging out...');
  }

}


