import React, { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  BookOpen,
  Clock,
  Award,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { CourseCard } from '../components/CourseCard';
import { AssignmentCard } from '../components/AssignmentCard';
import { RootStackNavigationProp } from '../types/navigation';
import { Course, Assignment } from '../types/student';

export const HomeScreen: React.FC = () => {
  const { student, courses, assignments, toggleAssignment } = useApp();
  const navigation = useNavigation<RootStackNavigationProp>();
  const insets = useSafeAreaInsets();

  const stats = useMemo(() => {
    const pendingAssignments = assignments.filter((a) => !a.isCompleted).length;
    return {
      courseCount: courses.length,
      pendingAssignments,
      gpa: student.gpa,
    };
  }, [assignments, courses, student]);

  const upcomingAssignments = useMemo(() => {
    return assignments.filter((a) => !a.isCompleted).slice(0, 3);
  }, [assignments]);

  const handleOpenCourse = (course: Course) => {
    navigation.navigate('CourseDetail', { course });
  };

  const handleOpenAssignment = (assignment: Assignment) => {
    navigation.navigate('AssignmentDetail', { assignmentId: assignment.id });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" />

      {/* Greeting Banner */}
      <View style={[styles.headerBanner, { paddingTop: Math.max(insets.top, 16) }]}>
        <View style={styles.studentInfoRow}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {student.fullName
                .split(' ')
                .map((n) => n[0])
                .slice(-2)
                .join('')}
            </Text>
          </View>
          <View style={styles.studentTextCol}>
            <Text style={styles.greetingText}>Xin chào 👋</Text>
            <Text style={styles.studentName}>{student.fullName}</Text>
            <View style={styles.badgeRow}>
              <View style={styles.codeBadge}>
                <Text style={styles.codeText}>MSSV: {student.id}</Text>
              </View>
              <View style={styles.classBadge}>
                <Text style={styles.classText}>{student.className}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <View style={[styles.statIconBox, { backgroundColor: '#EFF6FF' }]}>
              <BookOpen size={18} color="#2563EB" />
            </View>
            <Text style={styles.statValue}>{stats.courseCount}</Text>
            <Text style={styles.statLabel}>Môn học</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <View style={[styles.statIconBox, { backgroundColor: '#FEF3C7' }]}>
              <Clock size={18} color="#D97706" />
            </View>
            <Text style={[styles.statValue, { color: '#D97706' }]}>
              {stats.pendingAssignments}
            </Text>
            <Text style={styles.statLabel}>Cần nộp</Text>
          </View>

          <View style={styles.statDivider} />

          <TouchableOpacity
            style={styles.statItem}
            onPress={() => navigation.navigate('GradeDetail')}
            activeOpacity={0.7}
          >
            <View style={[styles.statIconBox, { backgroundColor: '#ECFDF5' }]}>
              <Award size={18} color="#059669" />
            </View>
            <Text style={[styles.statValue, { color: '#059669' }]}>
              {stats.gpa.toFixed(2)}
            </Text>
            <Text style={styles.statLabel}>GPA (Xem)</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Section 1: Môn học đang học */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Môn học đang học</Text>
            <Text style={styles.sectionSubtitle}>
              {student.currentSemester} • {courses.length} môn
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => (navigation as any).navigate('Courses')}
            style={styles.seeAllBtn}
          >
            <Text style={styles.seeAllText}>Xem tất cả</Text>
            <ChevronRight size={16} color="#2563EB" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={courses.slice(0, 3)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CourseCard course={item} onPress={() => handleOpenCourse(item)} />
          )}
          scrollEnabled={false}
        />
      </View>

      {/* Section 2: Bài tập sắp đến hạn */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Bài tập sắp đến hạn</Text>
            <Text style={styles.sectionSubtitle}>
              Ưu tiên hoàn thành các bài tập gần hạn nộp
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => (navigation as any).navigate('Assignments')}
            style={styles.seeAllBtn}
          >
            <Text style={styles.seeAllText}>Tất cả</Text>
            <ChevronRight size={16} color="#2563EB" />
          </TouchableOpacity>
        </View>

        {upcomingAssignments.length > 0 ? (
          <FlatList
            data={upcomingAssignments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AssignmentCard
                assignment={item}
                onPress={() => handleOpenAssignment(item)}
                onToggleStatus={() => toggleAssignment(item.id)}
              />
            )}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.emptyCard}>
            <CheckCircle2 size={32} color="#10B981" />
            <Text style={styles.emptyCardTitle}>Tuyệt vời!</Text>
            <Text style={styles.emptyCardSub}>
              Bạn đã hoàn thành tất cả các bài tập hiện tại.
            </Text>
          </View>
        )}
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerBanner: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  studentInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    elevation: 3,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  studentTextCol: {
    flex: 1,
  },
  greetingText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  studentName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  codeBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  codeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  classBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  classText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#E2E8F0',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563EB',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10B981',
    marginTop: 8,
  },
  emptyCardSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
});
