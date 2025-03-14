import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {NavbarConfig, ROLE_NAVBAR_CONFIG} from './models/role-navbar-config';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserRole} from '@core/models/UserRole';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMenuOpen = false;
  menuItems: NavbarConfig[] = [];
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    
  }

  ngOnInit(): void {
    
    this.menuItems = ROLE_NAVBAR_CONFIG[UserRole.Guest];
  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

