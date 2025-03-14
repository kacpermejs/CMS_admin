import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {NavbarConfig, ROLE_NAVBAR_CONFIG} from './models/role-navbar-config';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserRole} from '@core/models/UserRole';
import { Store } from '@ngrx/store';
import { selectUserRole } from 'app/store/selectors/user.selectors';
import { AuthService } from '@core/services/auth/auth.service';

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
  userRole$: Observable<UserRole>;

  auth = inject(AuthService);

  constructor(private store: Store) {
    this.userRole$ = this.store.select(selectUserRole); // Access the user role from the store
  }

  ngOnInit(): void {
    // Subscribe to the user role and change the menu items accordingly
    this.userRole$.subscribe((role: UserRole) => {
      this.menuItems = ROLE_NAVBAR_CONFIG[role] || ROLE_NAVBAR_CONFIG[UserRole.Guest];

      this.menuItems.forEach(item => {
        if (item.label === 'Sign out') {
          item.callback = () => this.auth.signOut();
        }
      });
    });
  }

  handleCallback(config: NavbarConfig) {
    if (config.callback) {
      config.callback();
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

