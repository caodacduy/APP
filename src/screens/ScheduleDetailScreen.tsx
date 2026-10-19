import React from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import { RootStackParamList, RootStackNavigationProp } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';

export const ScheduleDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ScheduleDetail'>>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const { schedule } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header
        title="Chi tiết buổi học"
        subtitle={schedule.dayLabel}
        onBack={() => navigation.goBack()}
      />

      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.courseName}>{schedule.courseName}</Text>
          <Text style={styles.courseCode}>Mã môn: {schedule.courseCode}</Text>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>Ngày học:</Text>
            <Text style={styles.value}>{schedule.dayLabel}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Thời gian:</Text>
            <Text style={styles.value}>{schedule.time}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Phòng học:</Text>
            <Text style={[styles.value, styles.roomText]}>{schedule.room}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Giảng viên:</Text>
            <Text style={styles.value}>{schedule.lecturer}</Text>
          </View>
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
    marginBottom: 2,
  },
  courseCode: {
    fontSize: 12.5,
    color: '#64748B',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
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
  roomText: {
    color: '#2563EB',
    fontWeight: '700',
  },
});
