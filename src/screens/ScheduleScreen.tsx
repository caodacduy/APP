import React, { useState, useMemo } from 'react';
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
import { Calendar } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { ScheduleCard } from '../components/ScheduleCard';
import { EmptyState } from '../components/EmptyState';
import { RootStackNavigationProp } from '../types/navigation';
import { ScheduleItem } from '../types/student';

const DAYS_OF_WEEK = [
  { id: 0, label: 'Cả tuần' },
  { id: 2, label: 'Thứ 2' },
  { id: 3, label: 'Thứ 3' },
  { id: 4, label: 'Thứ 4' },
  { id: 5, label: 'Thứ 5' },
  { id: 6, label: 'Thứ 6' },
  { id: 7, label: 'Thứ 7' },
];

export const ScheduleScreen: React.FC = () => {
  const { schedule } = useApp();
  const navigation = useNavigation<RootStackNavigationProp>();
  const insets = useSafeAreaInsets();
  const [selectedDay, setSelectedDay] = useState<number>(0);

  const filteredSchedule = useMemo(() => {
    if (selectedDay === 0) return schedule;
    return schedule.filter((item) => item.dayOfWeek === selectedDay);
  }, [schedule, selectedDay]);

  const handleOpenDetail = (item: ScheduleItem) => {
    navigation.navigate('ScheduleDetail', { schedule: item });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={[styles.topHeader, { paddingTop: Math.max(insets.top, 16) }]}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Thời khóa biểu</Text>
          <View style={styles.weekBadge}>
            <Calendar size={13} color="#2563EB" />
            <Text style={styles.weekText}>Học kỳ 1</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dayTabsList}
        >
          {DAYS_OF_WEEK.map((day) => {
            const isSelected = selectedDay === day.id;
            const count =
              day.id === 0
                ? schedule.length
                : schedule.filter((s) => s.dayOfWeek === day.id).length;

            return (
              <TouchableOpacity
                key={day.id}
                style={[styles.dayTab, isSelected && styles.activeDayTab]}
                onPress={() => setSelectedDay(day.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.dayTabText, isSelected && styles.activeDayTabText]}>
                  {day.label}
                </Text>
                {count > 0 && (
                  <View
                    style={[
                      styles.dayCountBadge,
                      isSelected && styles.activeDayCountBadge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayCountText,
                        isSelected && styles.activeDayCountText,
                      ]}
                    >
                      {count}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filteredSchedule}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ScheduleCard item={item} onPress={() => handleOpenDetail(item)} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            title="Không có lịch học"
            description="Bạn không có lịch học nào vào ngày này. Hãy dành thời gian tự học hoặc nghỉ ngơi!"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topHeader: {
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  weekBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  weekText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  dayTabsList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  dayTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeDayTab: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  dayTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  activeDayTabText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  dayCountBadge: {
    backgroundColor: '#E2E8F0',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDayCountBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
  },
  dayCountText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  activeDayCountText: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },
});
