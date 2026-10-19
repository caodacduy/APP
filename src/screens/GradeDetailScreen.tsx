import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Award, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react-native';
import { Header } from '../components/Header';
import { useApp } from '../context/AppContext';
import { GradeItem } from '../types/student';

export const GradeDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const { student, grades } = useApp();

  const renderGradeItem = ({ item }: { item: GradeItem }) => {
    const isA = item.letterGrade.startsWith('A');

    return (
      <View style={styles.gradeCard}>
        <View style={styles.cardHeader}>
          <View style={styles.courseInfoCol}>
            <View style={styles.codePill}>
              <Text style={styles.codePillText}>{item.courseCode}</Text>
              <Text style={styles.creditsSub}>• {item.credits} Tín chỉ</Text>
            </View>
            <Text style={styles.gradeCourseName} numberOfLines={2}>
              {item.courseName}
            </Text>
          </View>

          <View style={[styles.letterGradeBox, isA ? styles.gradeA : styles.gradeB]}>
            <Text style={[styles.letterGradeText, isA ? styles.textA : styles.textB]}>
              {item.letterGrade}
            </Text>
            <Text style={styles.scale4Text}>({item.totalScore4.toFixed(1)})</Text>
          </View>
        </View>

        <View style={styles.scoreGrid}>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreLabel}>Chuyên cần</Text>
            <Text style={styles.scoreValue}>{item.attendanceScore.toFixed(1)}</Text>
          </View>

          <View style={styles.scoreItem}>
            <Text style={styles.scoreLabel}>Giữa kỳ / BTL</Text>
            <Text style={styles.scoreValue}>{item.midtermScore.toFixed(1)}</Text>
          </View>

          {item.practiceScore !== undefined ? (
            <View style={styles.scoreItem}>
              <Text style={styles.scoreLabel}>Thực hành</Text>
              <Text style={styles.scoreValue}>{item.practiceScore.toFixed(1)}</Text>
            </View>
          ) : null}

          <View style={styles.scoreItem}>
            <Text style={styles.scoreLabel}>Thi cuối kỳ</Text>
            <Text style={styles.scoreValue}>{item.finalExamScore.toFixed(1)}</Text>
          </View>

          <View style={styles.scoreItem}>
            <Text style={styles.scoreLabel}>Tổng kết hệ 10</Text>
            <Text style={[styles.scoreValue, styles.totalScoreHighlight]}>
              {item.totalScore10.toFixed(1)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header
        title="Chi tiết kết quả học tập"
        subtitle="Bảng điểm tích lũy"
        onBack={() => navigation.goBack()}
      />

      <FlatList
        data={grades}
        keyExtractor={(item) => item.id}
        renderItem={renderGradeItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.summaryContainer}>
            {/* GPA Summary Card */}
            <View style={styles.gpaHeroCard}>
              <View style={styles.gpaHeroTop}>
                <View style={styles.sparkleBadge}>
                  <Sparkles size={14} color="#D97706" />
                  <Text style={styles.sparkleText}>Xếp loại: Xuất sắc</Text>
                </View>
                <Text style={styles.semesterTag}>{student.currentSemester}</Text>
              </View>

              <View style={styles.statsGrid}>
                <View style={styles.statBox}>
                  <Text style={styles.statBig}>{student.gpa.toFixed(2)}</Text>
                  <Text style={styles.statSub}>GPA (Thang 4)</Text>
                </View>

                <View style={styles.statDivider} />

                <View style={styles.statBox}>
                  <Text style={styles.statBig}>{student.gpaScale10.toFixed(2)}</Text>
                  <Text style={styles.statSub}>GPA (Thang 10)</Text>
                </View>

                <View style={styles.statDivider} />

                <View style={styles.statBox}>
                  <Text style={styles.statBig}>
                    {student.completedCredits}/{student.totalCredits}
                  </Text>
                  <Text style={styles.statSub}>Tín chỉ tích lũy</Text>
                </View>
              </View>

              <View style={styles.progressRow}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.round(
                          (student.completedCredits / student.totalCredits) * 100
                        )}%`,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progressPercentText}>
                  {Math.round((student.completedCredits / student.totalCredits) * 100)}% hoàn thành
                </Text>
              </View>
            </View>

            <Text style={styles.listTitle}>Danh sách điểm các học phần</Text>
          </View>
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
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },
  summaryContainer: {
    marginBottom: 16,
  },
  gpaHeroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    marginBottom: 16,
  },
  gpaHeroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sparkleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sparkleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
  },
  semesterTag: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginBottom: 14,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statBig: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  statSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#E2E8F0',
  },
  progressRow: {
    gap: 6,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  progressPercentText: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'right',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  gradeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  courseInfoCol: {
    flex: 1,
    marginRight: 12,
  },
  codePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  codePillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  creditsSub: {
    fontSize: 11,
    color: '#64748B',
  },
  gradeCourseName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 20,
  },
  letterGradeBox: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradeA: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  gradeB: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  letterGradeText: {
    fontSize: 20,
    fontWeight: '800',
  },
  textA: {
    color: '#059669',
  },
  textB: {
    color: '#2563EB',
  },
  scale4Text: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  scoreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
  },
  scoreItem: {
    flex: 1,
    minWidth: 60,
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 10,
    color: '#64748B',
    marginBottom: 2,
    textAlign: 'center',
  },
  scoreValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  totalScoreHighlight: {
    color: '#2563EB',
    fontWeight: '800',
  },
});
