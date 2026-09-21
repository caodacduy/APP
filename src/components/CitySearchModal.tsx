import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Search, X, MapPin, ChevronRight } from 'lucide-react-native';
import { LocationItem } from '../types/weather';
import { POPULAR_LOCATIONS, searchLocations } from '../api/weatherApi';

interface CitySearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectCity: (location: LocationItem) => void;
  currentLocation: LocationItem;
}

export const CitySearchModal: React.FC<CitySearchModalProps> = ({
  visible,
  onClose,
  onSelectCity,
  currentLocation,
}) => {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (!text.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const searchRes = await searchLocations(text);
      setResults(searchRes);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item: LocationItem) => {
    onSelectCity(item);
    setQuery('');
    setResults([]);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
      onRequestClose={onClose}
    >
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
          {/* Header & Thanh tìm kiếm neo cố định ở trên đỉnh */}
          <View style={styles.topHeader}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <ArrowLeft size={20} color="#334155" strokeWidth={2.2} />
            </TouchableOpacity>

            <View style={styles.searchBox}>
              <Search size={18} color="#94a3b8" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.searchInput}
                placeholder="Tìm thành phố (Hà Nội, Tokyo, Paris...)"
                placeholderTextColor="#94a3b8"
                value={query}
                onChangeText={handleSearch}
                autoFocus={true}
                returnKeyType="search"
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={() => handleSearch('')} style={styles.clearBtn}>
                  <X size={13} color="#ffffff" strokeWidth={2.5} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Trạng thái đang tải */}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#0284c7" />
              <Text style={styles.loadingText}>Đang tìm kiếm địa điểm...</Text>
            </View>
          )}

          {/* Danh sách kết quả tìm kiếm */}
          {results.length > 0 ? (
            <View style={styles.resultContainer}>
              <Text style={styles.sectionTitle}>KẾT QUẢ TÌM KIẾM ({results.length})</Text>
              <FlatList
                data={results}
                keyboardShouldPersistTaps="handled"
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.resultItem}
                    onPress={() => handleSelect(item)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.pinCircle}>
                      <MapPin size={18} color="#0284c7" strokeWidth={2.2} />
                    </View>
                    <View style={styles.resultInfo}>
                      <Text style={styles.cityName}>{item.name}</Text>
                      <Text style={styles.countryName}>
                        {item.admin1 ? `${item.admin1}, ` : ''}{item.country}
                      </Text>
                    </View>
                    <ChevronRight size={18} color="#94a3b8" />
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : query.trim().length > 0 && !loading ? (
            <View style={styles.emptyContainer}>
              <Search size={40} color="#94a3b8" style={{ marginBottom: 12, opacity: 0.6 }} />
              <Text style={styles.emptyText}>Không tìm thấy thành phố "{query}"</Text>
              <Text style={styles.emptySubtext}>Vui lòng kiểm tra lại chính tả hoặc thử tên tiếng Anh/không dấu</Text>
            </View>
          ) : null}

          {/* Danh sách thành phố gợi ý phổ biến (khi chưa gõ tìm kiếm) */}
          {query.length === 0 && (
            <View style={styles.popularSection}>
              <Text style={styles.sectionTitle}>THÀNH PHỐ PHỔ BIẾN</Text>
              <View style={styles.popularGrid}>
                {POPULAR_LOCATIONS.map((loc) => {
                  const isSelected = loc.id === currentLocation.id;
                  return (
                    <TouchableOpacity
                      key={loc.id}
                      style={[
                        styles.popularChip,
                        isSelected && styles.selectedChip,
                      ]}
                      onPress={() => handleSelect(loc)}
                      activeOpacity={0.7}
                    >
                      <MapPin
                        size={13}
                        color={isSelected ? '#ffffff' : '#64748b'}
                        style={{ marginRight: 6 }}
                      />
                      <Text
                        style={[
                          styles.chipText,
                          isSelected && styles.selectedChipText,
                        ]}
                      >
                        {loc.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  backIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#334155',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 22,
    paddingHorizontal: 14,
    height: 44,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#0f172a',
    paddingVertical: 0,
  },
  clearBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtnText: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: '800',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    color: '#64748b',
  },
  resultContainer: {
    flex: 1,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 0.6,
    marginBottom: 12,
    marginTop: 4,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  pinCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  pinText: {
    fontSize: 16,
  },
  resultInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  countryName: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  arrowIcon: {
    fontSize: 20,
    color: '#cbd5e1',
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 6,
  },
  popularSection: {
    marginTop: 14,
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  popularChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  chipPin: {
    fontSize: 12,
    marginRight: 6,
  },
  selectedChip: {
    backgroundColor: '#0284c7',
    borderColor: '#0284c7',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  selectedChipText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});
