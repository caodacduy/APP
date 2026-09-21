import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, ChevronDown, Search } from 'lucide-react-native';
import { LocationItem } from '../types/weather';

interface HeaderBarProps {
  location: LocationItem;
  onOpenSearch: () => void;
  textColor: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  location,
  onOpenSearch,
  textColor,
}) => {
  const currentDate = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.locationContainer}
        onPress={onOpenSearch}
        activeOpacity={0.7}
      >
        <View style={styles.titleRow}>
          <MapPin size={22} color={textColor} style={styles.locationIcon} />
          <Text style={[styles.locationName, { color: textColor }]} numberOfLines={1}>
            {location.name}
          </Text>
          <ChevronDown size={18} color={textColor} style={styles.dropdownIcon} />
        </View>
        <Text style={[styles.subText, { color: textColor }]}>
          {location.admin1 ? `${location.admin1}, ` : ''}{location.country} • {currentDate}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.searchButton}
        onPress={onOpenSearch}
        activeOpacity={0.7}
      >
        <Search size={19} color={textColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  locationContainer: {
    flex: 1,
    marginRight: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 6,
  },
  locationName: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  dropdownIcon: {
    marginLeft: 6,
    opacity: 0.8,
  },
  subText: {
    fontSize: 13,
    opacity: 0.85,
    marginTop: 2,
  },
  searchButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});
