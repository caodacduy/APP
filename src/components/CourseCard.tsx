import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ChevronRight, Award, User, MapPin } from 'lucide-react-native';
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
      activeOpacity={0.75}
    >
      <View style={[styles.colorBar, { backgroundColor: course.color || '#3B82F6' }]} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.codeBadge}>
            <Text style={styles.codeText}>{course.code}</Text>
          </View>
          <View style={styles.creditsBadge}>
            <Award size={12} color="#2563EB" />
            <Text style={styles.creditsText}>{course.credits} Tín chỉ</Text>
          </View>
        </View>

        <Text style={styles.courseName} numberOfLines={2}>
          {course.name}
        </Text>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <User size={13} color="#64748B" />
            <Text style={styles.infoText} numberOfLines={1}>
              {course.lecturer}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <MapPin size={13} color="#64748B" />
            <Text style={styles.infoText} numberOfLines={1}>
              {course.room}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.arrowContainer}>
        <ChevronRight size={18} color="#94A3B8" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  colorBar: {
    width: 6,
  },
  content: {
    flex: 1,
    padding: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  codeBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  codeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
    letterSpacing: 0.5,
  },
  creditsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  creditsText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2563EB',
  },
  courseName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    maxWidth: '55%',
  },
  infoText: {
    fontSize: 12,
    color: '#64748B',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 12,
  },
});
