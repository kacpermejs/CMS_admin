import { User } from '@angular/fire/auth';
import { UserAuthInfo } from '../models/AuthState';

export function extractToAuthInfo(user: User): UserAuthInfo {
  console.log('UserAuth:', user);
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    metadata: user.metadata,
  };
}
