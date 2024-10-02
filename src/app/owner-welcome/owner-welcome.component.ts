import { Component} from '@angular/core';
import { OwnerHomeComponent } from '../owner-home/owner-home.component';

@Component({
  selector: 'app-owner-welcome',
  standalone: true,
  imports: [OwnerHomeComponent],
  templateUrl: './owner-welcome.component.html',
  styleUrl: './owner-welcome.component.css'
})
  export class OwnerWelcomeComponent{
    ownerName: string;
  
    constructor() {
      
      this.ownerName = 'Elena'; 
    }

  
    navigateTo(destination: string): void {
      console.log(`Navigating to ${destination}`);
    }
  
    logout(): void {
      console.log('Logging out...');
    }

}
