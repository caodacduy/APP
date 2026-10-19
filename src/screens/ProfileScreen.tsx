import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  User,
  Mail,
  Phone,
  BookOpen,
  ChevronRight,
  Edit3,
  Check,
  X,
  RotateCcw,
  Sparkles,
} from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { RootStackNavigationProp } from '../types/navigation';

export const ProfileScreen: React.FC = () => {
  const { student, updateProfile, resetAllData } = useApp();
  const navigation = useNavigation<RootStackNavigationProp>();

  const [modalVisible, setModalVisible] = useState(false);
  const [editName, setEditName] = useState(student.fullName);
  const [editEmail, setEditEmail] = useState(student.email);
  const [editPhone, setEditPhone] = useState(student.phone);

  const handleOpenEdit = () => {
    setEditName(student.fullName);
    setEditEmail(student.email);
    setEditPhone(student.phone);
    setModalVisible(true);
  };

  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      Alert.alert('Lỗi', 'Họ tên không được để trống.');
      return;
    }
    if (!editEmail.trim() || !editEmail.includes('@')) {
      Alert.alert('Lỗi', 'Vui lòng nhập email hợp lệ.');
      return;
    }
    if (!editPhone.trim()) {
      Alert.alert('Lỗi', 'Số điện thoại không được để trống.');
      return;
    }

    await updateProfile({
      fullName: editName.trim(),
      email: editEmail.trim(),
      phone: editPhone.trim(),
    });

    setModalVisible(false);
    Alert.alert('Thành công', 'Thông tin sinh viên đã được cập nhật!');
  };

  const handleResetData = () => {
    Alert.alert(
      'Đặt lại dữ liệu',
      'Bạn có chắc chắn muốn khôi phục lại toàn bộ dữ liệu mẫu ban đầu?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đặt lại',
          style: 'destructive',
          onPress: async () => {
            await resetAllData();
            Alert.alert('Thông báo', 'Đã đặt lại dữ liệu mặc định.');
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" />

      {/* Header Info */}
      <View style={styles.headerCard}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarLargeText}>
            {student.fullName
              .split(' ')
              .map((n) => n[0])
              .slice(-2)
              .join('')}
          </Text>
        </View>

        <Text style={styles.fullName}>{student.fullName}</Text>
        <Text style={styles.studentId}>MSSV: {student.id}</Text>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={handleOpenEdit}
          activeOpacity={0.7}
        >
          <Edit3 size={15} color="#2563EB" />
          <Text style={styles.editBtnText}>Chỉnh sửa thông tin</Text>
        </TouchableOpacity>
      </View>

      {/* Section 1: Thông tin cá nhân */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.iconBox}>
              <User size={16} color="#2563EB" />
            </View>
            <View style={styles.infoDetails}>
              <Text style={styles.infoLabel}>Lớp sinh hoạt</Text>
              <Text style={styles.infoValue}>{student.className}</Text>
            </View>
          </View>

          <View style={styles.rowDivider} />

          <View style={styles.infoRow}>
            <View style={styles.iconBox}>
              <BookOpen size={16} color="#2563EB" />
            </View>
            <View style={styles.infoDetails}>
              <Text style={styles.infoLabel}>Ngành học</Text>
              <Text style={styles.infoValue}>{student.major}</Text>
            </View>
          </View>

          <View style={styles.rowDivider} />

          <View style={styles.infoRow}>
            <View style={styles.iconBox}>
              <Mail size={16} color="#2563EB" />
            </View>
            <View style={styles.infoDetails}>
              <Text style={styles.infoLabel}>Email sinh viên</Text>
              <Text style={styles.infoValue}>{student.email}</Text>
            </View>
          </View>

          <View style={styles.rowDivider} />

          <View style={styles.infoRow}>
            <View style={styles.iconBox}>
              <Phone size={16} color="#2563EB" />
            </View>
            <View style={styles.infoDetails}>
              <Text style={styles.infoLabel}>Số điện thoại</Text>
              <Text style={styles.infoValue}>{student.phone}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Section 2: Kết quả học tập */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kết quả học tập</Text>
        <TouchableOpacity
          style={styles.gradeOverviewCard}
          onPress={() => navigation.navigate('GradeDetail')}
          activeOpacity={0.8}
        >
          <View style={styles.gradeHeaderRow}>
            <View style={styles.gradeBadge}>
              <Sparkles size={14} color="#D97706" />
              <Text style={styles.gradeBadgeText}>Học lực Xuất sắc</Text>
            </View>
            <View style={styles.viewDetailLink}>
              <Text style={styles.viewDetailText}>Chi tiết bảng điểm</Text>
              <ChevronRight size={16} color="#2563EB" />
            </View>
          </View>

          <View style={styles.gpaGrid}>
            <View style={styles.gpaItem}>
              <Text style={styles.gpaBigNum}>{student.gpa.toFixed(2)}</Text>
              <Text style={styles.gpaSubLabel}>GPA thang 4</Text>
            </View>
            <View style={styles.gpaItemDivider} />
            <View style={styles.gpaItem}>
              <Text style={styles.gpaBigNum}>{student.gpaScale10.toFixed(2)}</Text>
              <Text style={styles.gpaSubLabel}>GPA thang 10</Text>
            </View>
            <View style={styles.gpaItemDivider} />
            <View style={styles.gpaItem}>
              <Text style={styles.gpaBigNum}>
                {student.completedCredits}/{student.totalCredits}
              </Text>
              <Text style={styles.gpaSubLabel}>Tín chỉ tích lũy</Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${Math.round(
                      (student.completedCredits / student.totalCredits) * 100
                    )}%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressPercent}>
              {Math.round((student.completedCredits / student.totalCredits) * 100)}%
              tiến độ chương trình đào tạo
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Section 3: Đặt lại dữ liệu */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetData}
          activeOpacity={0.7}
        >
          <RotateCcw size={16} color="#DC2626" />
          <Text style={styles.resetButtonText}>Đặt lại dữ liệu mẫu ban đầu</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 32 }} />

      {/* Modal chỉnh sửa */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chỉnh sửa thông tin</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <X size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Họ và tên</Text>
              <TextInput
                style={styles.textInput}
                value={editName}
                onChangeText={setEditName}
                placeholder="Nhập họ và tên"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email sinh viên</Text>
              <TextInput
                style={styles.textInput}
                value={editEmail}
                onChangeText={setEditEmail}
                placeholder="Nhập email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Số điện thoại</Text>
              <TextInput
                style={styles.textInput}
                value={editPhone}
                onChangeText={setEditPhone}
                placeholder="Nhập số điện thoại"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Hủy bỏ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleSaveProfile}
              >
                <Check size={16} color="#FFFFFF" />
                <Text style={styles.saveBtnText}>Lưu thay đổi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  avatarLarge: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 4,
  },
  avatarLargeText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  fullName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  studentId: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 12,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  editBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
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
  infoCard: {
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
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoDetails: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 2,
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  gradeOverviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
  },
  gradeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  gradeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 12,
  },
  gradeBadgeText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#D97706',
  },
  viewDetailLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewDetailText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#2563EB',
  },
  gpaGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 14,
  },
  gpaItem: {
    flex: 1,
    alignItems: 'center',
  },
  gpaBigNum: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  gpaSubLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  gpaItemDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
  progressSection: {
    gap: 6,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  progressPercent: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'right',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  resetButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#DC2626',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 36,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  modalCloseBtn: {
    padding: 4,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  textInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#0F172A',
    backgroundColor: '#F8FAFC',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  cancelBtn: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  saveBtn: {
    flex: 1.5,
    height: 44,
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#2563EB',
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
