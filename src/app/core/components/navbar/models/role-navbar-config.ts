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
    {label: 'Account', route: '/account'},
    {label: 'Sign out', button: ButtonType.Danger}
  ],
  [UserRole.Guest]: [
    {label: 'Sign in', route: '/login', button: ButtonType.Primary},
  ],
};
