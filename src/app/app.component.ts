import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OwnerComponent } from './owner/owner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,OwnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WebTechnikon_Front';
}
