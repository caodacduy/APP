import React, { useState, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { AssignmentCard } from '../components/AssignmentCard';
import { EmptyState } from '../components/EmptyState';
import { RootStackNavigationProp } from '../types/navigation';
import { Assignment } from '../types/student';

type FilterType = 'all' | 'pending' | 'completed';

export const AssignmentsScreen: React.FC = () => {
  const { assignments, toggleAssignment } = useApp();
  const navigation = useNavigation<RootStackNavigationProp>();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredAssignments = useMemo(() => {
    if (filter === 'pending') {
      return assignments.filter((a) => !a.isCompleted);
    }
    if (filter === 'completed') {
      return assignments.filter((a) => a.isCompleted);
    }
    return assignments;
  }, [assignments, filter]);

  const pendingCount = assignments.filter((a) => !a.isCompleted).length;
  const completedCount = assignments.filter((a) => a.isCompleted).length;

  const handleOpenDetail = (assignment: Assignment) => {
    navigation.navigate('AssignmentDetail', { assignmentId: assignment.id });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={[styles.topHeader, { paddingTop: Math.max(insets.top, 16) }]}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Danh sách bài tập</Text>
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingBadgeText}>{pendingCount} cần nộp</Text>
          </View>
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterBtn, filter === 'all' && styles.activeFilterBtn]}
            onPress={() => setFilter('all')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterBtnText,
                filter === 'all' && styles.activeFilterBtnText,
              ]}
            >
              Tất cả ({assignments.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterBtn, filter === 'pending' && styles.activeFilterBtn]}
            onPress={() => setFilter('pending')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterBtnText,
                filter === 'pending' && styles.activeFilterBtnText,
              ]}
            >
              Chưa xong ({pendingCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterBtn, filter === 'completed' && styles.activeFilterBtn]}
            onPress={() => setFilter('completed')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterBtnText,
                filter === 'completed' && styles.activeFilterBtnText,
              ]}
            >
              Đã xong ({completedCount})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredAssignments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AssignmentCard
            assignment={item}
            onPress={() => handleOpenDetail(item)}
            onToggleStatus={() => toggleAssignment(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            title="Không có bài tập nào"
            description={
              filter === 'pending'
                ? 'Tuyệt vời! Bạn không còn bài tập nào chưa hoàn thành.'
                : 'Chưa có bài tập nào trong danh mục này.'
            }
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  pendingBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  pendingBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeFilterBtn: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  filterBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  activeFilterBtnText: {
    color: '#2563EB',
    fontWeight: '700',
  },
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },
});
