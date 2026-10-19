import React from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header';
import { useApp } from '../context/AppContext';
import { GradeItem } from '../types/student';

export const GradeDetailScreen: React.FC = () => {
  const { student, grades } = useApp();
  const navigation = useNavigation();

  const renderGradeItem = ({ item }: { item: GradeItem }) => (
    <View style={styles.gradeCard}>
      <View style={styles.courseHeader}>
        <View style={styles.titleCol}>
          <Text style={styles.courseName}>{item.courseName}</Text>
          <Text style={styles.courseCode}>{item.courseCode} • {item.credits} tín chỉ</Text>
        </View>
        <View style={styles.letterBox}>
          <Text style={styles.letterText}>{item.letterGrade}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.scoreRow}>
        <View style={styles.scoreCol}>
          <Text style={styles.scoreLabel}>Tổng kết hệ 10</Text>
          <Text style={styles.scoreNum}>{item.totalScore10.toFixed(1)}</Text>
        </View>
        <View style={styles.scoreCol}>
          <Text style={styles.scoreLabel}>Thang điểm 4</Text>
          <Text style={styles.scoreNum}>{item.totalScore4.toFixed(1)}</Text>
        </View>
        <View style={styles.scoreCol}>
          <Text style={styles.scoreLabel}>Kết quả</Text>
          <Text style={[styles.scoreNum, { color: '#059669' }]}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header
        title="Chi tiết kết quả học tập"
        onBack={() => navigation.goBack()}
      />

      <FlatList
        data={grades}
        keyExtractor={(item) => item.id}
        renderItem={renderGradeItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Tóm tắt kết quả</Text>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>{student.gpa.toFixed(2)}</Text>
                <Text style={styles.statLabel}>GPA (Thang 4)</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statVal}>{student.gpaScale10.toFixed(2)}</Text>
                <Text style={styles.statLabel}>GPA (Thang 10)</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statVal}>{student.completedCredits}</Text>
                <Text style={styles.statLabel}>Tín chỉ tích lũy</Text>
              </View>
            </View>
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
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingVertical: 10,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statVal: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
  gradeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleCol: {
    flex: 1,
    marginRight: 8,
  },
  courseName: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  courseCode: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  letterBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  letterText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2563EB',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  scoreCol: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 2,
  },
  scoreNum: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0F172A',
  },
});
