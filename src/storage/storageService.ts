import AsyncStorage from '@react-native-async-storage/async-storage';
import { StudentProfile, Assignment } from '../types/student';
import { INITIAL_STUDENT, INITIAL_ASSIGNMENTS } from '../data/mockData';

const STORAGE_KEYS = {
  STUDENT_PROFILE: '@student_profile_v1',
  ASSIGNMENTS: '@student_assignments_v1',
};

export const StorageService = {
  async getStudentProfile(): Promise<StudentProfile> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.STUDENT_PROFILE);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.warn('Lỗi đọc StudentProfile từ AsyncStorage:', error);
    }
    return INITIAL_STUDENT;
  },

  async saveStudentProfile(profile: StudentProfile): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.STUDENT_PROFILE, JSON.stringify(profile));
    } catch (error) {
      console.error('Lỗi lưu StudentProfile vào AsyncStorage:', error);
      throw error;
    }
  },

  async getAssignments(): Promise<Assignment[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.warn('Lỗi đọc Assignments từ AsyncStorage:', error);
    }
    return INITIAL_ASSIGNMENTS;
  },

  async saveAssignments(assignments: Assignment[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
    } catch (error) {
      console.error('Lỗi lưu Assignments vào AsyncStorage:', error);
      throw error;
    }
  },

  async resetToDefault(): Promise<{ student: StudentProfile; assignments: Assignment[] }> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.STUDENT_PROFILE);
      await AsyncStorage.removeItem(STORAGE_KEYS.ASSIGNMENTS);
    } catch (error) {
      console.warn('Lỗi xóa cache:', error);
    }
    return {
      student: INITIAL_STUDENT,
      assignments: INITIAL_ASSIGNMENTS,
    };
  },
};
