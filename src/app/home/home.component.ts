import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  // Μετάβαση στη σελίδα Admin
  goToAdmin() {
    this.router.navigate(['/admin-home']);
  }

  // Μετάβαση στη σελίδα Owner
  goToOwner() {
    this.router.navigate(['/owner-home']);
  }
}
