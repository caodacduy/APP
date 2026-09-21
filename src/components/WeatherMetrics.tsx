import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Droplets, Wind, CloudRain, Sunrise } from 'lucide-react-native';
import { CurrentWeather, DailyForecastItem } from '../types/weather';

interface WeatherMetricsProps {
  current: CurrentWeather;
  todayForecast?: DailyForecastItem;
  cardBg: string;
  textColor: string;
}

export const WeatherMetrics: React.FC<WeatherMetricsProps> = ({
  current,
  todayForecast,
  cardBg,
  textColor,
}) => {
  const metrics = [
    {
      icon: (color: string) => <Droplets size={16} color={color} strokeWidth={2.2} />,
      title: 'ĐỘ ẨM',
      value: `${current.humidity}%`,
      subtext: current.humidity > 70 ? 'Độ ẩm cao' : 'Thoáng đãng',
    },
    {
      icon: (color: string) => <Wind size={16} color={color} strokeWidth={2.2} />,
      title: 'TỐC ĐỘ GIÓ',
      value: `${current.windSpeed} km/h`,
      subtext: current.windSpeed < 15 ? 'Gió nhẹ' : 'Gió giật vừa',
    },
    {
      icon: (color: string) => <CloudRain size={16} color={color} strokeWidth={2.2} />,
      title: 'LƯỢNG MƯA',
      value: `${current.precipitation} mm`,
      subtext: current.precipitation > 0 ? 'Có mưa rải rác' : 'Không có mưa',
    },
    {
      icon: (color: string) => <Sunrise size={16} color={color} strokeWidth={2.2} />,
      title: 'MẶT TRỜI',
      value: todayForecast ? `${todayForecast.sunrise}` : '--:--',
      subtext: todayForecast ? `Lặn: ${todayForecast.sunset}` : '--:--',
    },
  ];

  return (
    <View style={styles.container}>
      {metrics.map((item, index) => (
        <View
          key={index}
          style={[styles.card, { backgroundColor: cardBg }]}
        >
          <View style={styles.cardHeader}>
            <View style={styles.cardIconWrapper}>{item.icon(textColor)}</View>
            <Text style={[styles.cardTitle, { color: textColor }]}>
              {item.title}
            </Text>
          </View>
          <Text style={[styles.cardValue, { color: textColor }]}>
            {item.value}
          </Text>
          <Text style={[styles.cardSubtext, { color: textColor }]}>
            {item.subtext}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginVertical: 10,
  },
  card: {
    width: '48%',
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardIconWrapper: {
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: '700',
    opacity: 0.75,
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 2,
  },
  cardSubtext: {
    fontSize: 12,
    opacity: 0.8,
  },
});
