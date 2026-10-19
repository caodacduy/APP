import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  AlertCircle,
  FileText,
  RotateCcw,
} from 'lucide-react-native';
import { Header } from '../components/Header';
import { StatusBadge } from '../components/StatusBadge';
import { useApp } from '../context/AppContext';
import { RootStackParamList, RootStackNavigationProp } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';

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
    Alert.alert(
      'Thành công',
      assignment.isCompleted
        ? 'Đã chuyển trạng thái sang "Chưa hoàn thành".'
        : 'Chúc mừng bạn đã hoàn thành bài tập!'
    );
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
        {/* Banner */}
        <View style={styles.headerBanner}>
          <View style={styles.statusRow}>
            <View style={styles.courseBadge}>
              <Text style={styles.courseBadgeText}>{assignment.courseCode}</Text>
            </View>
            <StatusBadge isCompleted={assignment.isCompleted} />
          </View>

          <Text style={styles.assignmentTitle}>{assignment.title}</Text>
          <Text style={styles.courseName}>{assignment.courseName}</Text>
        </View>

        {/* Action Toggle Button */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              assignment.isCompleted ? styles.reopenButton : styles.completeButton,
            ]}
            onPress={handleToggle}
            activeOpacity={0.8}
          >
            {assignment.isCompleted ? (
              <>
                <RotateCcw size={18} color="#D97706" />
                <Text style={styles.reopenButtonText}>Đánh dấu là Chưa hoàn thành</Text>
              </>
            ) : (
              <>
                <CheckCircle2 size={18} color="#FFFFFF" />
                <Text style={styles.completeButtonText}>Đánh dấu là ĐÃ HOÀN THÀNH</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Thông tin hạn nộp & trọng số */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin nộp bài</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <View style={styles.iconCircle}>
                <Clock size={18} color={assignment.isCompleted ? '#10B981' : '#DC2626'} />
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.label}>Hạn nộp bài</Text>
                <Text
                  style={[
                    styles.value,
                    !assignment.isCompleted && styles.deadlineAlert,
                  ]}
                >
                  {assignment.dueDateFormatted}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.iconCircle}>
                <Award size={18} color="#2563EB" />
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.label}>Trọng số điểm</Text>
                <Text style={styles.value}>{assignment.weight}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.iconCircle}>
                <FileText size={18} color="#2563EB" />
              </View>
              <View style={styles.infoCol}>
                <Text style={styles.label}>Hình thức nộp bài</Text>
                <Text style={styles.value}>{assignment.submissionType}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Nội dung đề bài */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nội dung & Yêu cầu đề bài</Text>
          <View style={styles.card}>
            <Text style={styles.descriptionText}>{assignment.description}</Text>
            {assignment.attachmentNote ? (
              <View style={styles.noteBox}>
                <AlertCircle size={15} color="#D97706" style={{ marginTop: 2 }} />
                <Text style={styles.noteText}>{assignment.attachmentNote}</Text>
              </View>
            ) : null}
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
  notFoundCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 15,
    color: '#64748B',
  },
  headerBanner: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  courseBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  courseBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  assignmentTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 26,
    marginBottom: 6,
  },
  courseName: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  actionContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    elevation: 3,
  },
  completeButton: {
    backgroundColor: '#10B981',
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  reopenButton: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  reopenButtonText: {
    color: '#D97706',
    fontSize: 14,
    fontWeight: '700',
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
  deadlineAlert: {
    color: '#DC2626',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
  },
  noteBox: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#FFFBEB',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginTop: 12,
  },
  noteText: {
    flex: 1,
    fontSize: 12.5,
    color: '#92400E',
    lineHeight: 18,
  },
});
