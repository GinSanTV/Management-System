
import { UserRole, UserProfile } from '../types';

export const MOCK_USERS: Record<string, UserProfile> = {
  'admin-uid': {
    uid: 'admin-uid',
    email: 'admin@neonguard.cyber',
    displayName: 'A.D.M.I.N.',
    role: UserRole.ADMIN,
    createdAt: Date.now()
  },
  'employee-uid': {
    uid: 'employee-uid',
    email: 'worker@neonguard.cyber',
    displayName: 'Nexus-7',
    role: UserRole.EMPLOYEE,
    createdAt: Date.now()
  }
};
