import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { DailyForecastItem } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface DailyForecastProps {
  daily: DailyForecastItem[];
  cardBg: string;
  textColor: string;
}

export const DailyForecast: React.FC<DailyForecastProps> = ({
  daily,
  cardBg,
  textColor,
}) => {
  // Tìm min và max toàn cục của cả tuần để vẽ thanh nhiệt độ tỷ lệ chuẩn
  const minTempOfWeek = Math.min(...daily.map(d => d.temperatureMin));
  const maxTempOfWeek = Math.max(...daily.map(d => d.temperatureMax));
  const tempRange = Math.max(1, maxTempOfWeek - minTempOfWeek);

  return (
    <View style={styles.container}>
      <View style={[styles.wrapperCard, { backgroundColor: cardBg }]}>
        <View style={styles.header}>
          <Calendar size={14} color={textColor} strokeWidth={2.2} style={styles.headerIcon} />
          <Text style={[styles.headerTitle, { color: textColor }]}>
            DỰ BÁO 7 NGÀY TỚI
          </Text>
        </View>

        <View style={styles.listContainer}>
          {daily.map((item, index) => {
            const isToday = index === 0;

            // Tính toán tỷ lệ chiều rộng của thanh dải nhiệt độ
            const leftRatio = Math.max(0, (item.temperatureMin - minTempOfWeek) / tempRange);
            const widthRatio = Math.max(0.2, (item.temperatureMax - item.temperatureMin) / tempRange);

            return (
              <View
                key={index}
                style={[
                  styles.dayRow,
                  index !== daily.length - 1 && styles.borderBottom,
                ]}
              >
                {/* Thứ trong tuần */}
                <Text
                  style={[
                    styles.dayText,
                    { color: textColor },
                    isToday && styles.todayText,
                  ]}
                >
                  {item.dayOfWeek}
                </Text>

                {/* Biểu tượng thời tiết Vector */}
                <View style={styles.iconContainer}>
                  <WeatherIcon code={item.weatherCode} size={20} color={textColor} strokeWidth={1.8} />
                </View>

                {/* Dải nhiệt độ Min - Max */}
                <View style={styles.tempRangeContainer}>
                  <Text style={[styles.minTemp, { color: textColor }]}>
                    {item.temperatureMin}°
                  </Text>

                  {/* Thanh tỷ lệ nhiệt độ */}
                  <View style={styles.barBackground}>
                    <View
                      style={[
                        styles.barFill,
                        {
                          left: `${leftRatio * 70}%`,
                          width: `${widthRatio * 30 + 20}%`,
                        },
                      ]}
                    />
                  </View>

                  <Text style={[styles.maxTemp, { color: textColor }]}>
                    {item.temperatureMax}°
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 10,
    marginBottom: 30,
  },
  wrapperCard: {
    borderRadius: 22,
    paddingTop: 14,
    paddingBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
  },
  headerIcon: {
    marginRight: 6,
    opacity: 0.85,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    opacity: 0.85,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  dayText: {
    fontSize: 15,
    fontWeight: '500',
    width: 80,
    opacity: 0.9,
  },
  todayText: {
    fontWeight: '800',
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  tempRangeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    justifyContent: 'flex-end',
  },
  minTemp: {
    fontSize: 14,
    fontWeight: '600',
    width: 32,
    textAlign: 'right',
    opacity: 0.75,
  },
  barBackground: {
    flex: 1,
    height: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 3,
    marginHorizontal: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  barFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: '#fbbf24',
    borderRadius: 3,
  },
  maxTemp: {
    fontSize: 14,
    fontWeight: '700',
    width: 32,
    textAlign: 'left',
  },
});
