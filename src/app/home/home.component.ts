import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerHomeComponent } from '../owner-home/owner-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [OwnerHomeComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  // Μετάβαση στη σελίδα Admin
  goToAdmin() {
    this.router.navigate(['/admin-welcome']);
  }

  // Μετάβαση στη σελίδα Owner
  goToOwner() {
    this.router.navigate(['/owner-welcome']);
  }
}
