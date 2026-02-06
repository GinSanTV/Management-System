
export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  SUPPORT = 'SUPPORT',
  EMPLOYEE = 'EMPLOYEE',
  GUEST = 'GUEST'
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  assignedTo: string;
  createdAt: number;
}

export interface TimeEntry {
  id: string;
  userId: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  description: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: 'OPEN' | 'CLOSED' | 'PENDING';
  createdAt: number;
}
