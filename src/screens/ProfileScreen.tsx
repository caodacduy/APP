import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronRight, Edit2, X, Check } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { RootStackNavigationProp } from '../types/navigation';

export const ProfileScreen: React.FC = () => {
  const { student, updateProfile } = useApp();
  const navigation = useNavigation<RootStackNavigationProp>();
  const insets = useSafeAreaInsets();

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
    if (!editName.trim() || !editEmail.trim() || !editPhone.trim()) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ họ tên, email và số điện thoại.');
      return;
    }
    await updateProfile({
      fullName: editName.trim(),
      email: editEmail.trim(),
      phone: editPhone.trim(),
    });
    setModalVisible(false);
    Alert.alert('Thành công', 'Thông tin cá nhân đã được cập nhật.');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={[styles.headerCard, { paddingTop: Math.max(insets.top, 20) }]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {student.fullName
              .split(' ')
              .map((n) => n[0])
              .slice(-2)
              .join('')}
          </Text>
        </View>
        <Text style={styles.fullName}>{student.fullName}</Text>
        <Text style={styles.studentId}>Mã SV: {student.id}</Text>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={handleOpenEdit}
          activeOpacity={0.8}
        >
          <Edit2 size={13} color="#2563EB" />
          <Text style={styles.editBtnText}>Chỉnh sửa thông tin</Text>
        </TouchableOpacity>
      </View>

      {/* Thông tin sinh viên */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin sinh viên</Text>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Mã sinh viên:</Text>
            <Text style={styles.infoValue}>{student.id}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Họ và tên:</Text>
            <Text style={styles.infoValue}>{student.fullName}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Lớp:</Text>
            <Text style={styles.infoValue}>{student.className}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Ngành học:</Text>
            <Text style={styles.infoValue}>{student.major}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{student.email}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Số điện thoại:</Text>
            <Text style={styles.infoValue}>{student.phone}</Text>
          </View>
        </View>
      </View>

      {/* Tóm tắt kết quả học tập */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tóm tắt kết quả học tập</Text>
        <View style={styles.card}>
          <View style={styles.gpaGrid}>
            <View style={styles.gpaItem}>
              <Text style={styles.gpaValue}>{student.gpa.toFixed(2)}</Text>
              <Text style={styles.gpaLabel}>GPA (Thang 4)</Text>
            </View>
            <View style={styles.gpaDivider} />
            <View style={styles.gpaItem}>
              <Text style={styles.gpaValue}>{student.gpaScale10.toFixed(2)}</Text>
              <Text style={styles.gpaLabel}>GPA (Thang 10)</Text>
            </View>
            <View style={styles.gpaDivider} />
            <View style={styles.gpaItem}>
              <Text style={styles.gpaValue}>{student.completedCredits}</Text>
              <Text style={styles.gpaLabel}>Tín chỉ tích lũy</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.detailBtn}
            onPress={() => navigation.navigate('GradeDetail')}
            activeOpacity={0.8}
          >
            <Text style={styles.detailBtnText}>Chi tiết kết quả học tập</Text>
            <ChevronRight size={16} color="#2563EB" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 24 }} />

      {/* Modal Chỉnh sửa thông tin */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chỉnh sửa thông tin cơ bản</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
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
              <Text style={styles.inputLabel}>Email</Text>
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
                <Text style={styles.cancelBtnText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleSaveProfile}
              >
                <Check size={16} color="#FFFFFF" />
                <Text style={styles.saveBtnText}>Lưu</Text>
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
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  fullName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  studentId: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 10,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  editBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 13.5,
    color: '#64748B',
  },
  infoValue: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#0F172A',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 8,
  },
  gpaGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 12,
  },
  gpaItem: {
    flex: 1,
    alignItems: 'center',
  },
  gpaValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  gpaLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  gpaDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
  detailBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 10,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
  },
  detailBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563EB',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 18,
    paddingBottom: 32,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
  },
  textInput: {
    height: 42,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#0F172A',
    backgroundColor: '#F8FAFC',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  cancelBtn: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  cancelBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  saveBtn: {
    flex: 1.5,
    height: 40,
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#2563EB',
  },
  saveBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
