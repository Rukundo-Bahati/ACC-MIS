// Users Mock Data
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'student' | 'faculty' | 'staff' | 'administrator';
  firstName: string;
  lastName: string;
  phone?: string;
  department?: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLogin?: string;
  avatar?: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'john_doe',
    email: 'student@icc.edu',
    role: 'student',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1234567890',
    department: 'Computer Science',
    status: 'active',
    createdAt: '2024-01-15T08:00:00Z',
    lastLogin: '2024-01-20T14:30:00Z'
  },
  {
    id: '2',
    username: 'jane_smith',
    email: 'faculty@icc.edu',
    role: 'faculty',
    firstName: 'Jane',
    lastName: 'Smith',
    phone: '+1234567891',
    department: 'Mathematics',
    status: 'active',
    createdAt: '2024-01-10T09:00:00Z',
    lastLogin: '2024-01-20T16:45:00Z'
  },
  {
    id: '3',
    username: 'admin_user',
    email: 'admin@icc.edu',
    role: 'administrator',
    firstName: 'Admin',
    lastName: 'User',
    phone: '+1234567892',
    department: 'Administration',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-20T18:00:00Z'
  },
  {
    id: '4',
    username: 'staff_member',
    email: 'staff@icc.edu',
    role: 'staff',
    firstName: 'Staff',
    lastName: 'Member',
    phone: '+1234567893',
    department: 'Student Services',
    status: 'active',
    createdAt: '2024-01-05T10:00:00Z',
    lastLogin: '2024-01-20T12:00:00Z'
  }
];