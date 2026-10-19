import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { CourseCard } from '../components/CourseCard';
import { AssignmentCard } from '../components/AssignmentCard';
import { RootStackNavigationProp } from '../types/navigation';

export const HomeScreen: React.FC = () => {
  const { student, courses, assignments, toggleAssignment } = useApp();
  const navigation = useNavigation<RootStackNavigationProp>();
  const insets = useSafeAreaInsets();

  const upcomingAssignments = assignments
    .filter((a) => !a.isCompleted)
    .slice(0, 3);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" />

      {/* Header: Họ tên và Mã sinh viên */}
      <View style={[styles.headerBanner, { paddingTop: Math.max(insets.top, 16) }]}>
        <Text style={styles.greetingLabel}>HỌ VÀ TÊN SINH VIÊN</Text>
        <Text style={styles.studentName}>{student.fullName}</Text>
        <View style={styles.mssvBadge}>
          <Text style={styles.mssvText}>Mã sinh viên: {student.id}</Text>
        </View>
      </View>

      {/* Danh sách môn học đang học */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Môn học đang học</Text>
          <Text style={styles.countText}>{courses.length} môn</Text>
        </View>
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CourseCard
              course={item}
              onPress={() => navigation.navigate('CourseDetail', { course: item })}
            />
          )}
          scrollEnabled={false}
        />
      </View>

      {/* Các bài tập sắp đến hạn */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Bài tập sắp đến hạn</Text>
          <Text style={styles.countText}>{upcomingAssignments.length} bài cần nộp</Text>
        </View>
        {upcomingAssignments.length > 0 ? (
          <FlatList
            data={upcomingAssignments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AssignmentCard
                assignment={item}
                onPress={() =>
                  navigation.navigate('AssignmentDetail', { assignmentId: item.id })
                }
                onToggleStatus={() => toggleAssignment(item.id)}
              />
            )}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>Không có bài tập nào sắp đến hạn.</Text>
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
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  greetingLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  studentName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
    marginBottom: 6,
  },
  mssvBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  mssvText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  countText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 13,
    color: '#64748B',
  },
});
