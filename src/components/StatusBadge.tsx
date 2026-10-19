import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react-native';

interface StatusBadgeProps {
  isCompleted: boolean;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ isCompleted, size = 'md' }) => {
  const isSmall = size === 'sm';

  if (isCompleted) {
    return (
      <View style={[styles.badge, styles.completedBadge, isSmall && styles.badgeSm]}>
        <CheckCircle2 size={isSmall ? 12 : 14} color="#10B981" />
        <Text style={[styles.text, styles.completedText, isSmall && styles.textSm]}>
          Đã hoàn thành
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.badge, styles.pendingBadge, isSmall && styles.badgeSm]}>
      <Clock size={isSmall ? 12 : 14} color="#F59E0B" />
      <Text style={[styles.text, styles.pendingText, isSmall && styles.textSm]}>
        Chưa hoàn thành
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgeSm: {
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    gap: 3.5,
  },
  completedBadge: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  pendingBadge: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  textSm: {
    fontSize: 11,
  },
  completedText: {
    color: '#065F46',
  },
  pendingText: {
    color: '#92400E',
  },
});
