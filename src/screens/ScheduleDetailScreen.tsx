import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  Clock,
  MapPin,
  User,
  Calendar,
  Building,
  AlertCircle,
  BookOpen,
} from 'lucide-react-native';
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
        {/* Top Highlight Card */}
        <View style={styles.banner}>
          <View style={[styles.typeBadge, { backgroundColor: schedule.color || '#3B82F6' }]}>
            <Text style={styles.typeBadgeText}>{schedule.type}</Text>
          </View>
          <Text style={styles.courseName}>{schedule.courseName}</Text>
          <Text style={styles.courseCode}>Mã môn: {schedule.courseCode}</Text>
        </View>

        {/* Section: Thời gian và Địa điểm */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thời gian & Địa điểm</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <View style={styles.iconCircle}>
                <Calendar size={18} color="#2563EB" />
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.label}>Ngày học</Text>
                <Text style={styles.value}>{schedule.dayLabel}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.iconCircle}>
                <Clock size={18} color="#2563EB" />
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.label}>Thời gian & Tiết học</Text>
                <Text style={styles.value}>
                  {schedule.time} ({schedule.periods})
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.iconCircle}>
                <MapPin size={18} color="#2563EB" />
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.label}>Phòng học</Text>
                <Text style={[styles.value, styles.roomHighlight]}>
                  {schedule.room}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.iconCircle}>
                <Building size={18} color="#2563EB" />
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.label}>Địa điểm tòa nhà</Text>
                <Text style={styles.value}>{schedule.building}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Section: Giảng viên & Ghi chú */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Giảng viên & Ghi chú</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <View style={styles.iconCircle}>
                <User size={18} color="#2563EB" />
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.label}>Giảng viên phụ trách</Text>
                <Text style={styles.value}>{schedule.lecturer}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.iconCircle}>
                <AlertCircle size={18} color="#F59E0B" />
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.label}>Ghi chú buổi học</Text>
                <Text style={styles.notesText}>{schedule.notes || 'Không có ghi chú.'}</Text>
              </View>
            </View>
          </View>
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
  banner: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  typeBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  courseName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  courseCode: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
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
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  infoCol: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: '#64748B',
  },
  value: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  roomHighlight: {
    color: '#2563EB',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  notesText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 19,
    marginTop: 2,
  },
});
