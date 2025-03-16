import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {NavbarConfig, ROLE_NAVBAR_CONFIG} from './models/role-navbar-config';
import {map, Observable} from 'rxjs';
import {UserRole} from '@core/models/UserRole';
import { Store } from '@ngrx/store';
import { selectUserAuth, selectUserRole } from '@core/store/selectors/user.selectors';
import { logout } from '@core/store/actions/auth.actions';

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
  userLoggedIn$: Observable<boolean>;

  store = inject(Store)
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute)

  constructor() {
    this.userRole$ = this.store.select(selectUserRole); // Access the user role from the store
    this.userLoggedIn$ = this.store.select(selectUserAuth).pipe(
      map(auth => auth ? true : false)
    ); // Access the user role from the store
  }

  ngOnInit(): void {
    // Subscribe to the user role and change the menu items accordingly
    this.userRole$.subscribe((role: UserRole) => {
      this.menuItems = ROLE_NAVBAR_CONFIG[role] || ROLE_NAVBAR_CONFIG[UserRole.Guest];
    });
  }

  handleCallback(config: NavbarConfig) {
    if (config.callback) {
      config.callback();
    }
  }

  signIn() {
    const currentUrl = this.router.url;
    this.router.navigate(['/login'], { queryParams: { currentUrl } });
  }

  signOut() {
    this.store.dispatch(logout());
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

