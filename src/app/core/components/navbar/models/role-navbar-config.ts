import { inject } from "@angular/core";
import { UserRole } from "@core/models/UserRole";
import { AuthService } from "@core/services/auth/auth.service";

export enum ButtonType {
  None = 'none',
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger'
}

export interface NavbarConfig {
  label: string;
  route?: string;
  button?: ButtonType;
  callback?: () => void;
}

export const ROLE_NAVBAR_CONFIG: Record<UserRole, NavbarConfig[]> = {
  [UserRole.Client]: [
    {label: 'Content Models', route: '/content-models'},
    {label: 'Content Entries', route: '/content-entries'},
    {label: 'Dashboard', route: '/dashboard'},
    {label: 'About', route: '/about'},
  ],
  [UserRole.Guest]: [
    {label: 'About', route: '/about'},
  ],
  [UserRole.Admin]: [
    {label: 'Dashboard', route: '/admin/dashboard'},
  ],
};
