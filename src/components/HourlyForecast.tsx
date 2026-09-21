import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Clock } from 'lucide-react-native';
import { HourlyForecastItem } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface HourlyForecastProps {
  hourly: HourlyForecastItem[];
  cardBg: string;
  textColor: string;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({
  hourly,
  cardBg,
  textColor,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.wrapperCard, { backgroundColor: cardBg }]}>
        <View style={styles.header}>
          <Clock size={15} color={textColor} strokeWidth={2.2} style={styles.headerIcon} />
          <Text style={[styles.headerTitle, { color: textColor }]}>
            DỰ BÁO THEO GIỜ (24H TIẾP THEO)
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {hourly.map((item, index) => {
            const isFirst = index === 0;

            return (
              <View
                key={index}
                style={[
                  styles.hourlyItem,
                  isFirst && styles.firstItem,
                ]}
              >
                <Text style={[styles.hourText, { color: textColor }]}>
                  {item.time}
                </Text>
                <View style={styles.iconContainer}>
                  <WeatherIcon
                    code={item.weatherCode}
                    isDay={item.isDay}
                    size={24}
                    color={textColor}
                  />
                </View>
                <Text style={[styles.tempText, { color: textColor }]}>
                  {item.temperature}°
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  wrapperCard: {
    borderRadius: 22,
    paddingTop: 14,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
  },
  headerIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    opacity: 0.85,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingTop: 12,
  },
  hourlyItem: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    minWidth: 64,
  },
  firstItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  hourText: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    opacity: 0.9,
  },
  iconContainer: {
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
  },
  tempText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
