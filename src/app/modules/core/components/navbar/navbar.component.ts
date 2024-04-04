import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: User | null = null;
  sub!: Subscription;
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.sub = this.authService.user.subscribe({
      next: (value) => (this.user = value),
    });
  }

  ngOnDestroy(): void {}
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  logout() {
    this.authService.logout();
  }
  navigateToHome() {
    this.router.navigate(['']);
  }
}
