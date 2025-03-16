import { UserRole } from "@core/models/UserRole";

export interface UserAuthInfo {
  uid: string;
  email: string | null;
  displayName: string | null;
  metadata: any;
}

export interface UserData {
  role: UserRole;
}

export interface UserState {
  auth: UserAuthInfo | null,
  user: UserData;
  error: string | null;
  loading: boolean;
}

export const initialUserData = { role: UserRole.Guest };

export const initialUserState: UserState = {
  auth: null,
  user: initialUserData,
  error: null,
  loading: false,
};

