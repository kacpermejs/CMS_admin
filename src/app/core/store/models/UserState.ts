import { UserRole } from "@core/models/UserRole";

export enum SubscriptionTier {
  Free = "Free",
  Lite = "Lite",
  Pro = "Pro"
};

export interface UserData {
  role: UserRole;
  nickname?: string;
  tier?: SubscriptionTier;
}

export interface UserDataState {
  user: UserData;
  error: string | null;
  loading: boolean;
}

export const initialUserData = { 
  role: UserRole.Guest,
};

export const initialUserState: UserDataState = {
  user: initialUserData,
  loading: true, //loading initiated with application start
  error: null,
};

