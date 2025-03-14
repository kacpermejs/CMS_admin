import { UserRole } from "../../core/models/UserRole";

export interface UserState {
  role: UserRole;
  error: string | null;
  loading: boolean;
}

export const initialUserState: UserState = {
  role: UserRole.Guest,
  error: null,
  loading: false,
};

