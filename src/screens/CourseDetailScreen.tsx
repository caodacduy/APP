import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  Award,
  User,
  MapPin,
  Clock,
  BookOpen,
  Mail,
  CheckCircle,
  FileText,
} from 'lucide-react-native';
import { Header } from '../components/Header';
import { AssignmentCard } from '../components/AssignmentCard';
import { useApp } from '../context/AppContext';
import { RootStackParamList, RootStackNavigationProp } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';

export const CourseDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'CourseDetail'>>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const { course } = route.params;
  const { assignments, schedule, toggleAssignment } = useApp();

  // Lọc bài tập và lịch học của môn này
  const courseAssignments = assignments.filter((a) => a.courseId === course.id);
  const courseSchedule = schedule.filter((s) => s.courseId === course.id);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header
        title="Chi tiết môn học"
        subtitle={course.code}
        onBack={() => navigation.goBack()}
      />

      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        {/* Course Header Banner */}
        <View style={styles.courseHeader}>
          <View style={[styles.codeBadge, { backgroundColor: course.color || '#3B82F6' }]}>
            <Text style={styles.codeText}>{course.code}</Text>
          </View>
          <Text style={styles.courseTitle}>{course.name}</Text>

          <View style={styles.tagRow}>
            <View style={styles.tagBadge}>
              <Award size={13} color="#2563EB" />
              <Text style={styles.tagText}>{course.credits} Tín chỉ</Text>
            </View>
            <View style={[styles.tagBadge, styles.categoryBadge]}>
              <Text style={styles.categoryText}>{course.category}</Text>
            </View>
          </View>
        </View>

        {/* Section: Thông tin lớp học & Giảng viên */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin giảng dạy</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <View style={styles.iconBox}>
                <User size={16} color="#2563EB" />
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>Giảng viên phụ trách</Text>
                <Text style={styles.infoValue}>{course.lecturer}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.iconBox}>
                <Mail size={16} color="#2563EB" />
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>Email liên hệ</Text>
                <Text style={styles.infoValue}>{course.lecturerEmail}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.iconBox}>
                <MapPin size={16} color="#2563EB" />
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>Phòng học</Text>
                <Text style={styles.infoValue}>{course.room}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.iconBox}>
                <Clock size={16} color="#2563EB" />
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.infoLabel}>Thời gian học</Text>
                <Text style={styles.infoValue}>{course.time}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Section: Giới thiệu môn học */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mục tiêu & Đề cương môn học</Text>
          <View style={styles.card}>
            <Text style={styles.descriptionText}>{course.description}</Text>
            {course.prerequisites ? (
              <View style={styles.prereqBox}>
                <Text style={styles.prereqLabel}>Học phần tiên quyết:</Text>
                <Text style={styles.prereqValue}>{course.prerequisites}</Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* Section: Bài tập của môn này */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Bài tập môn học</Text>
            <Text style={styles.countText}>{courseAssignments.length} bài tập</Text>
          </View>

          {courseAssignments.length > 0 ? (
            courseAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onPress={() =>
                  navigation.navigate('AssignmentDetail', {
                    assignmentId: assignment.id,
                  })
                }
                onToggleStatus={() => toggleAssignment(assignment.id)}
              />
            ))
          ) : (
            <View style={styles.card}>
              <Text style={styles.emptyText}>
                Hiện tại môn học này chưa có bài tập nào.
              </Text>
            </View>
          )}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollArea: {
    flex: 1,
  },
  courseHeader: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  codeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  codeText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 28,
    marginBottom: 12,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  categoryBadge: {
    backgroundColor: '#F1F5F9',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  countText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoCol: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
  },
  prereqBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  prereqLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  prereqValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563EB',
    marginTop: 2,
  },
  emptyText: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    paddingVertical: 8,
  },
});
