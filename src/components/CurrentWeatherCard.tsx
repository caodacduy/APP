import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowUp, ArrowDown } from 'lucide-react-native';
import { CurrentWeather, DailyForecastItem } from '../types/weather';
import { getWeatherInfo } from '../api/wmoCodes';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherCardProps {
  current: CurrentWeather;
  todayForecast?: DailyForecastItem;
  textColor: string;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  current,
  todayForecast,
  textColor,
}) => {
  const weatherInfo = getWeatherInfo(current.weatherCode, current.isDay);

  return (
    <View style={styles.container}>
      {/* Biểu tượng thời tiết chính */}
      <View style={styles.mainIconWrapper}>
        <WeatherIcon
          code={current.weatherCode}
          isDay={current.isDay}
          size={76}
          color={textColor}
          strokeWidth={1.8}
        />
      </View>

      {/* Nhiệt độ lớn */}
      <View style={styles.tempRow}>
        <Text style={[styles.mainTemp, { color: textColor }]}>
          {current.temperature}
        </Text>
        <Text style={[styles.degreeSymbol, { color: textColor }]}>°C</Text>
      </View>

      {/* Mô tả trạng thái thời tiết */}
      <Text style={[styles.conditionText, { color: textColor }]}>
        {weatherInfo.description}
      </Text>

      {/* Dải nhiệt độ & cảm nhận */}
      <View style={styles.badgeContainer}>
        {todayForecast && (
          <View style={styles.tempBadge}>
            <ArrowUp size={13} color="#ffffff" strokeWidth={2.5} style={{ marginRight: 2 }} />
            <Text style={styles.badgeText}>{todayForecast.temperatureMax}°</Text>
            <View style={styles.badgeDivider} />
            <ArrowDown size={13} color="#ffffff" strokeWidth={2.5} style={{ marginRight: 2 }} />
            <Text style={styles.badgeText}>{todayForecast.temperatureMin}°</Text>
          </View>
        )}
        <View style={styles.feelsLikeBadge}>
          <Text style={styles.badgeText}>
            Cảm nhận {current.apparentTemperature}°C
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 18,
  },
  mainIconWrapper: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  mainTemp: {
    fontSize: 84,
    fontWeight: '200',
    lineHeight: 90,
  },
  degreeSymbol: {
    fontSize: 32,
    fontWeight: '400',
    marginTop: 8,
    marginLeft: 2,
  },
  conditionText: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 6,
    letterSpacing: 0.2,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 14,
  },
  tempBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  badgeDivider: {
    width: 1,
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 8,
  },
  feelsLikeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
});
