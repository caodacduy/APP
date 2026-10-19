import React from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import { RootStackParamList, RootStackNavigationProp } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';

export const CourseDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'CourseDetail'>>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const { course } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header
        title="Chi tiết môn học"
        subtitle={course.code}
        onBack={() => navigation.goBack()}
      />

      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.courseName}>{course.name}</Text>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Mã môn: {course.code}</Text>
            </View>
            <View style={[styles.badge, styles.creditBadge]}>
              <Text style={[styles.badgeText, styles.creditText]}>{course.credits} tín chỉ</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>Giảng viên:</Text>
            <Text style={styles.value}>{course.lecturer}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Phòng học:</Text>
            <Text style={styles.value}>{course.room}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Thời gian học:</Text>
            <Text style={styles.value}>{course.time}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.descLabel}>Mô tả môn học:</Text>
          <Text style={styles.descText}>{course.description}</Text>
        </View>
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
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  courseName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  creditBadge: {
    backgroundColor: '#EFF6FF',
  },
  creditText: {
    color: '#2563EB',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  label: {
    fontSize: 13,
    color: '#64748B',
  },
  value: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#0F172A',
  },
  descLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  descText: {
    fontSize: 13.5,
    color: '#475569',
    lineHeight: 20,
  },
});
