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
import { Header } from '../components/Header';
import { RootStackParamList, RootStackNavigationProp } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';
import { useApp } from '../context/AppContext';

export const AssignmentDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'AssignmentDetail'>>();
  const navigation = useNavigation<RootStackNavigationProp>();
  const { assignmentId } = route.params;
  const { assignments, toggleAssignment } = useApp();

  const assignment = assignments.find((a) => a.id === assignmentId);

  if (!assignment) {
    return (
      <View style={styles.container}>
        <Header title="Chi tiết bài tập" onBack={() => navigation.goBack()} />
        <View style={styles.notFoundCenter}>
          <Text style={styles.notFoundText}>Không tìm thấy bài tập này.</Text>
        </View>
      </View>
    );
  }

  const handleToggle = () => {
    toggleAssignment(assignment.id);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header
        title="Chi tiết bài tập"
        subtitle={assignment.courseCode}
        onBack={() => navigation.goBack()}
      />

      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.assignmentTitle}>{assignment.title}</Text>
          <Text style={styles.courseName}>{assignment.courseName}</Text>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>Hạn nộp:</Text>
            <Text style={styles.value}>{assignment.dueDateFormatted}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Trạng thái:</Text>
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

          {/* Nút thay đổi trạng thái */}
          <TouchableOpacity
            style={[
              styles.actionButton,
              assignment.isCompleted ? styles.reopenBtn : styles.completeBtn,
            ]}
            onPress={handleToggle}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.actionBtnText,
                assignment.isCompleted ? styles.reopenBtnText : styles.completeBtnText,
              ]}
            >
              {assignment.isCompleted
                ? 'Đổi sang: Chưa hoàn thành'
                : 'Đổi sang: Đã hoàn thành'}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <Text style={styles.descLabel}>Yêu cầu bài tập:</Text>
          <Text style={styles.descText}>{assignment.description}</Text>
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
  notFoundCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 14,
    color: '#64748B',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  courseName: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  badge: {
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeWarning: {
    backgroundColor: '#FEF3C7',
  },
  badgeWarningText: {
    color: '#D97706',
    fontSize: 11,
    fontWeight: '700',
  },
  badgeSuccess: {
    backgroundColor: '#ECFDF5',
  },
  badgeSuccessText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '700',
  },
  actionButton: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeBtn: {
    backgroundColor: '#10B981',
  },
  completeBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  reopenBtn: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  reopenBtnText: {
    color: '#D97706',
    fontWeight: '700',
    fontSize: 13,
  },
  actionBtnText: {
    fontSize: 13,
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
