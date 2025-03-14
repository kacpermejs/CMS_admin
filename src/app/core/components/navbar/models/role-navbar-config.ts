import { UserRole } from "@core/models/UserRole";

export enum ButtonType {
  None = 'none',
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger'
}

export interface NavbarConfig {
  label: string;
  route: string;
  button?: ButtonType;
}

export const ROLE_NAVBAR_CONFIG: Record<UserRole, NavbarConfig[]> = {
  [UserRole.Client]: [
    {label: 'Account', route: '/account'},
  ],
  [UserRole.Guest]: [
    {label: 'Sign in', route: '/login', button: ButtonType.Primary},
  ],
};
