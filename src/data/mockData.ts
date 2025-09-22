// ============= MOCK DATA FOR MIS SYSTEM =============
// Centralized mock data for better organization and backend integration

// Export all data types and mock data
export * from './users';
// TODO: Split into separate files for better organization
// export * from './applicants';
// export * from './communications'; 
// export * from './assessments';

// Applicants Mock Data
export interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  city: string;
  country: string;
  program: string;
  previousEducation: string;
  gpa: number;
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'waitlisted';
  documents: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export const mockApplicants: Applicant[] = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@email.com',
    phone: '+1234567893',
    dateOfBirth: '2000-05-15',
    gender: 'female',
    address: '123 Main Street',
    city: 'Kigali',
    country: 'Rwanda',
    program: 'Computer Science',
    previousEducation: 'High School Diploma',
    gpa: 3.8,
    applicationDate: '2024-01-15T10:00:00Z',
    status: 'approved',
    documents: ['transcript.pdf', 'recommendation.pdf'],
    emergencyContact: {
      name: 'Mary Johnson',
      relationship: 'Mother',
      phone: '+1234567894'
    }
  },
  {
    id: '2',
    firstName: 'Bob',
    lastName: 'Wilson',
    email: 'bob.wilson@email.com',
    phone: '+1234567895',
    dateOfBirth: '1999-12-03',
    gender: 'male',
    address: '456 Oak Avenue',
    city: 'Kigali',
    country: 'Rwanda',
    program: 'Business Administration',
    previousEducation: 'High School Diploma',
    gpa: 3.5,
    applicationDate: '2024-01-18T14:30:00Z',
    status: 'pending',
    documents: ['transcript.pdf'],
    emergencyContact: {
      name: 'Robert Wilson Sr.',
      relationship: 'Father',
      phone: '+1234567896'
    }
  }
];

// Communications Mock Data
export interface Communication {
  id: string;
  title: string;
  message: string;
  type: "announcement" | "alert" | "reminder";
  channels: ("email" | "sms" | "in-app")[];
  audience: "all" | "students" | "faculty" | "staff" | "administrators";
  priority: "low" | "medium" | "high" | "urgent";
  status: "draft" | "scheduled" | "sent";
  scheduledDate?: string;
  createdAt: string;
  createdBy: string;
  readCount?: number;
  totalRecipients?: number;
  readBy?: string[];
}

export const mockCommunications: Communication[] = [
  {
    id: "1",
    title: "Final Exam Schedule Released",
    message: "The final examination schedule for Fall 2024 semester has been released. Please check your student portal for detailed timing and locations.",
    type: "announcement",
    channels: ["email", "in-app"],
    audience: "students",
    priority: "high",
    status: "sent",
    createdAt: "2024-01-15T10:00:00Z",
    createdBy: "Dean's Office",
    readCount: 1250,
    totalRecipients: 1500,
    readBy: ["1", "2"]
  },
  {
    id: "2",
    title: "Emergency Campus Closure",
    message: "Due to severe weather conditions, the campus will be closed today. All classes and activities are suspended until further notice.",
    type: "alert",
    channels: ["email", "sms", "in-app"],
    audience: "all",
    priority: "urgent",
    status: "sent",
    createdAt: "2024-01-14T06:30:00Z",
    createdBy: "Campus Security",
    readCount: 2800,
    totalRecipients: 3000,
    readBy: ["1", "2", "3"]
  }
];

// Assessment Questions Mock Data
export interface Question {
  id: string;
  questionText: string;
  type: 'multiple-choice' | 'true-false' | 'essay' | 'fill-blank';
  options?: string[];
  correctAnswer?: string | number;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  topic: string;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  subject: string;
  duration: number; // in minutes
  totalPoints: number;
  questions: Question[];
  status: 'draft' | 'published' | 'archived';
  createdBy: string;
  createdAt: string;
  scheduledDate?: string;
  allowedAttempts: number;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  timeLimit: boolean;
  preventCheating: boolean;
}

export const mockQuestions: Question[] = [
  {
    id: '1',
    questionText: 'What is the capital of Rwanda?',
    type: 'multiple-choice',
    options: ['Kigali', 'Butare', 'Gitarama', 'Ruhengeri'],
    correctAnswer: 0,
    points: 2,
    difficulty: 'easy',
    subject: 'Geography',
    topic: 'African Capitals'
  },
  {
    id: '2',
    questionText: 'The process of converting source code into machine code is called compilation.',
    type: 'true-false',
    correctAnswer: 'true',
    points: 1,
    difficulty: 'medium',
    subject: 'Computer Science',
    topic: 'Programming Basics'
  },
  {
    id: '3',
    questionText: 'Explain the concept of object-oriented programming and its main principles.',
    type: 'essay',
    points: 10,
    difficulty: 'hard',
    subject: 'Computer Science',
    topic: 'Object-Oriented Programming'
  }
];

export const mockAssessments: Assessment[] = [
  {
    id: '1',
    title: 'Introduction to Computer Science - Midterm',
    description: 'Comprehensive midterm examination covering programming fundamentals, data structures, and algorithms.',
    subject: 'Computer Science',
    duration: 120,
    totalPoints: 100,
    questions: mockQuestions.slice(1, 3),
    status: 'published',
    createdBy: 'Prof. Jane Smith',
    createdAt: '2024-01-10T09:00:00Z',
    scheduledDate: '2024-01-25T14:00:00Z',
    allowedAttempts: 1,
    shuffleQuestions: true,
    shuffleOptions: true,
    timeLimit: true,
    preventCheating: true
  },
  {
    id: '2',
    title: 'Geography Quiz - African Capitals',
    description: 'Quick quiz on African capital cities.',
    subject: 'Geography',
    duration: 30,
    totalPoints: 20,
    questions: [mockQuestions[0]],
    status: 'draft',
    createdBy: 'Prof. John Doe',
    createdAt: '2024-01-15T11:00:00Z',
    allowedAttempts: 2,
    shuffleQuestions: true,
    shuffleOptions: true,
    timeLimit: true,
    preventCheating: false
  }
];

// Student Responses Mock Data
export interface StudentResponse {
  id: string;
  assessmentId: string;
  studentId: string;
  responses: { [questionId: string]: string | number | boolean };
  startTime: string;
  endTime?: string;
  score?: number;
  status: 'in-progress' | 'completed' | 'submitted' | 'terminated';
  cheatingDetected: boolean;
  violations: string[];
}

export const mockStudentResponses: StudentResponse[] = [
  {
    id: '1',
    assessmentId: '1',
    studentId: '1',
    responses: {
      '2': 'true',
      '3': 'Object-oriented programming is a programming paradigm based on the concept of objects...'
    },
    startTime: '2024-01-25T14:00:00Z',
    endTime: '2024-01-25T15:45:00Z',
    score: 85,
    status: 'completed',
    cheatingDetected: false,
    violations: []
  }
];