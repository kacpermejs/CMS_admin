export interface UserAuthInfo {
  uid: string;
  email: string | null;
  displayName: string | null;
  metadata: any;
}

export interface UserAuthState {
  auth: UserAuthInfo | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: UserAuthState = {
  auth: null,
  loading: true, //loading initiated with application start
  error: null
}