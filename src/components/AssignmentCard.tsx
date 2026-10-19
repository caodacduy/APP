import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Check, Clock, ChevronRight } from 'lucide-react-native';
import { Assignment } from '../types/student';

interface AssignmentCardProps {
  assignment: Assignment;
  onPress: () => void;
  onToggleStatus: () => void;
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  onPress,
  onToggleStatus,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, assignment.isCompleted && styles.completedCard]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <TouchableOpacity
        style={[styles.checkbox, assignment.isCompleted && styles.checkedCheckbox]}
        onPress={onToggleStatus}
        activeOpacity={0.7}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        {assignment.isCompleted && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.courseName} numberOfLines={1}>
            {assignment.courseName}
          </Text>
          <View
            style={[
              styles.badge,
              assignment.isCompleted ? styles.badgeSuccess : styles.badgeWarning,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                assignment.isCompleted ? styles.badgeSuccessText : styles.badgeWarningText,
              ]}
            >
              {assignment.isCompleted ? 'Hoàn thành' : 'Chưa hoàn thành'}
            </Text>
          </View>
        </View>

        <Text
          style={[styles.title, assignment.isCompleted && styles.completedTitle]}
          numberOfLines={2}
        >
          {assignment.title}
        </Text>

        <View style={styles.metaRow}>
          <Clock size={12} color="#64748B" />
          <Text style={styles.metaText}>Hạn nộp: {assignment.dueDateFormatted}</Text>
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
  completedCard: {
    backgroundColor: '#F8FAFC',
    opacity: 0.85,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#FFFFFF',
  },
  checkedCheckbox: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  courseName: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    flex: 1,
    marginRight: 6,
  },
  badge: {
  },
  badgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeWarning: {
    backgroundColor: '#FEF3C7',
  },
  badgeWarningText: {
    color: '#D97706',
    fontSize: 10.5,
    fontWeight: '700',
  },
  badgeSuccess: {
    backgroundColor: '#ECFDF5',
  },
  badgeSuccessText: {
    color: '#059669',
    fontSize: 10.5,
    fontWeight: '700',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#64748B',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11.5,
    color: '#64748B',
  },
});
