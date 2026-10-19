import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { StudentProfile, Course, ScheduleItem, Assignment, GradeItem } from '../types/student';
import { INITIAL_STUDENT, INITIAL_COURSES, INITIAL_SCHEDULE, INITIAL_ASSIGNMENTS, INITIAL_GRADES } from '../data/mockData';
import { StorageService } from '../storage/storageService';

interface AppContextType {
  student: StudentProfile;
  courses: Course[];
  schedule: ScheduleItem[];
  assignments: Assignment[];
  grades: GradeItem[];
  isLoading: boolean;
  updateProfile: (updated: Partial<StudentProfile>) => Promise<void>;
  toggleAssignment: (id: string) => Promise<void>;
  resetAllData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<StudentProfile>(INITIAL_STUDENT);
  const [courses] = useState<Course[]>(INITIAL_COURSES);
  const [schedule] = useState<ScheduleItem[]>(INITIAL_SCHEDULE);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [grades] = useState<GradeItem[]>(INITIAL_GRADES);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Khởi tạo và nạp dữ liệu từ AsyncStorage
  useEffect(() => {
    const initData = async () => {
      try {
        const [savedStudent, savedAssignments] = await Promise.all([
          StorageService.getStudentProfile(),
          StorageService.getAssignments(),
        ]);
        setStudent(savedStudent);
        setAssignments(savedAssignments);
      } catch (err) {
        console.error('Lỗi nạp dữ liệu ứng dụng:', err);
      } finally {
        setIsLoading(false);
      }
    };
    initData();
  }, []);

  // Cập nhật thông tin sinh viên (họ tên, email, sđt) và lưu vào AsyncStorage
  const updateProfile = useCallback(async (updated: Partial<StudentProfile>) => {
    setStudent((prev) => {
      const newStudent = { ...prev, ...updated };
      StorageService.saveStudentProfile(newStudent).catch((e) =>
        console.error('Lưu profile thất bại:', e)
      );
      return newStudent;
    });
  }, []);

  // Đổi trạng thái bài tập (Hoàn thành / Chưa hoàn thành) và lưu vào AsyncStorage
  const toggleAssignment = useCallback(async (id: string) => {
    setAssignments((prev) => {
      const next = prev.map((item) => {
        if (item.id === id) {
          return { ...item, isCompleted: !item.isCompleted };
        }
        return item;
      });
      StorageService.saveAssignments(next).catch((e) =>
        console.error('Lưu assignments thất bại:', e)
      );
      return next;
    });
  }, []);

  // Đặt lại dữ liệu gốc ban đầu
  const resetAllData = useCallback(async () => {
    const defaultData = await StorageService.resetToDefault();
    setStudent(defaultData.student);
    setAssignments(defaultData.assignments);
  }, []);

  return (
    <AppContext.Provider
      value={{
        student,
        courses,
        schedule,
        assignments,
        grades,
        isLoading,
        updateProfile,
        toggleAssignment,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
