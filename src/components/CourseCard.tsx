import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Course } from '../types/student';

interface CourseCardProps {
  course: Course;
  onPress: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.codeText}>{course.code}</Text>
          <View style={styles.creditBadge}>
            <Text style={styles.creditText}>{course.credits} tín chỉ</Text>
          </View>
        </View>
        <Text style={styles.courseName}>{course.name}</Text>
      </View>
      <ChevronRight size={18} color="#94A3B8" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 1,
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  codeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
  },
  creditBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  creditText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2563EB',
  },
  courseName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
});
