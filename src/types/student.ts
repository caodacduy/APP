export interface StudentProfile {
  id: string; // Mã SV: B21DCCN001
  fullName: string;
  className: string;
  major: string;
  faculty: string;
  email: string;
  phone: string;
  academicYear: string;
  gpa: number;
  gpaScale10: number;
  completedCredits: number;
  totalCredits: number;
  currentSemester: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  lecturer: string;
  lecturerEmail: string;
  room: string;
  time: string;
  description: string;
  category: 'Chuyên ngành' | 'Cơ sở ngành' | 'Đại cương';
  color: string;
  prerequisites?: string;
}

export interface ScheduleItem {
  id: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  dayOfWeek: number; // 2: Thứ 2, 3: Thứ 3, ..., 7: Thứ 7
  dayLabel: string;
  time: string;
  periods: string;
  room: string;
  building: string;
  lecturer: string;
  type: 'Lý thuyết' | 'Thực hành' | 'Đồ án';
  notes: string;
  color: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  title: string;
  dueDate: string;
  dueDateFormatted: string;
  daysLeft: number;
  isCompleted: boolean;
  description: string;
  weight: string;
  submissionType: string;
  attachmentNote?: string;
}

export interface GradeItem {
  id: string;
  courseCode: string;
  courseName: string;
  credits: number;
  semester: string;
  attendanceScore: number;
  midtermScore: number;
  practiceScore?: number;
  finalExamScore: number;
  totalScore10: number;
  totalScore4: number;
  letterGrade: string;
  status: 'Đạt' | 'Chưa đạt';
}
