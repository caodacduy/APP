import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Clock, MapPin, User, ChevronRight } from 'lucide-react-native';
import { ScheduleItem } from '../types/student';

interface ScheduleCardProps {
  item: ScheduleItem;
  onPress: () => void;
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ item, onPress }) => {
  const isLab = item.type === 'Thực hành';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={[styles.leftAccent, { backgroundColor: item.color || '#3B82F6' }]} />
      <View style={styles.mainContent}>
        <View style={styles.topRow}>
          <View style={styles.timeBadge}>
            <Clock size={12} color="#1E293B" />
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
          <View style={[styles.typeBadge, isLab ? styles.labBadge : styles.theoryBadge]}>
            <Text style={[styles.typeText, isLab ? styles.labText : styles.theoryText]}>
              {item.type}
            </Text>
          </View>
        </View>

        <Text style={styles.courseName} numberOfLines={2}>
          {item.courseName}
        </Text>

        <View style={styles.bottomRow}>
          <View style={styles.infoChip}>
            <MapPin size={13} color="#2563EB" />
            <Text style={styles.roomText}>{item.room}</Text>
          </View>
          <View style={styles.infoChip}>
            <User size={13} color="#64748B" />
            <Text style={styles.lecturerText} numberOfLines={1}>
              {item.lecturer}
            </Text>
          </View>
        </View>

        <Text style={styles.periodText}>
          {item.periods} • {item.building}
        </Text>
      </View>

      <View style={styles.arrowBox}>
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
  leftAccent: {
    width: 6,
  },
  mainContent: {
    flex: 1,
    padding: 14,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 12,
  },
  theoryBadge: {
    backgroundColor: '#EFF6FF',
  },
  labBadge: {
    backgroundColor: '#F3E8FF',
  },
  typeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  theoryText: {
    color: '#2563EB',
  },
  labText: {
    color: '#7C3AED',
  },
  courseName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
    lineHeight: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6,
  },
  infoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    maxWidth: '55%',
  },
  roomText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  lecturerText: {
    fontSize: 12,
    color: '#64748B',
  },
  periodText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  arrowBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 12,
  },
});
