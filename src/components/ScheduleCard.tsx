import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Clock, MapPin, ChevronRight } from 'lucide-react-native';
import { ScheduleItem } from '../types/student';

interface ScheduleCardProps {
  item: ScheduleItem;
  onPress: () => void;
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.courseName}>{item.courseName}</Text>
        <View style={styles.infoRow}>
          <View style={styles.metaItem}>
            <Clock size={13} color="#64748B" />
            <Text style={styles.metaText}>{item.time}</Text>
          </View>
          <View style={styles.metaItem}>
            <MapPin size={13} color="#2563EB" />
            <Text style={[styles.metaText, styles.roomText]}>{item.room}</Text>
          </View>
        </View>
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
  courseName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12.5,
    color: '#64748B',
  },
  roomText: {
    fontWeight: '600',
    color: '#2563EB',
  },
});
