import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Check, Clock, ChevronRight } from 'lucide-react-native';
import { Assignment } from '../types/student';
import { StatusBadge } from './StatusBadge';

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
      style={[
        styles.card,
        assignment.isCompleted && styles.completedCard,
      ]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* Checkbox button */}
      <TouchableOpacity
        style={[
          styles.checkbox,
          assignment.isCompleted && styles.checkedCheckbox,
        ]}
        onPress={onToggleStatus}
        activeOpacity={0.7}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        {assignment.isCompleted && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
      </TouchableOpacity>

      <View style={styles.body}>
        <View style={styles.topInfo}>
          <View style={styles.courseBadge}>
            <Text style={styles.courseBadgeText}>{assignment.courseCode}</Text>
          </View>
          <StatusBadge isCompleted={assignment.isCompleted} size="sm" />
        </View>

        <Text
          style={[
            styles.title,
            assignment.isCompleted && styles.completedTitle,
          ]}
          numberOfLines={2}
        >
          {assignment.title}
        </Text>

        <Text style={styles.courseName} numberOfLines={1}>
          {assignment.courseName}
        </Text>

        <View style={styles.deadlineRow}>
          <Clock size={13} color={assignment.isCompleted ? '#94A3B8' : '#EF4444'} />
          <Text
            style={[
              styles.deadlineText,
              !assignment.isCompleted && styles.deadlineAlert,
            ]}
          >
            Hạn: {assignment.dueDateFormatted}
          </Text>
        </View>
      </View>

      <View style={styles.arrow}>
        <ChevronRight size={18} color="#94A3B8" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  completedCard: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    opacity: 0.88,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
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
  body: {
    flex: 1,
  },
  topInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  courseBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  courseBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  title: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 3,
    lineHeight: 19,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#64748B',
  },
  courseName: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 6,
  },
  deadlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deadlineText: {
    fontSize: 11.5,
    color: '#64748B',
    fontWeight: '500',
  },
  deadlineAlert: {
    color: '#DC2626',
    fontWeight: '600',
  },
  arrow: {
    marginLeft: 8,
  },
});
