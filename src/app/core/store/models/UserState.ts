import { UserRole } from "@core/models/UserRole";

export interface UserState {
  auth: UserAuthInfo | null,
  role: UserRole;
  error: string | null;
  loading: boolean;
}

export const initialUserState: UserState = {
  auth: null,
  role: UserRole.Guest,
  error: null,
  loading: false,
};

export interface UserAuthInfo {
  uid: string;
  email: string | null;
  displayName: string | null;
  metadata: any;
}

