import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  StatusBar,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AlertCircle } from 'lucide-react-native';
import { WeatherData, LocationItem } from './src/types/weather';
import { fetchWeatherData, DEFAULT_LOCATION } from './src/api/weatherApi';
import { getWeatherInfo } from './src/api/wmoCodes';
import { HeaderBar } from './src/components/HeaderBar';
import { CurrentWeatherCard } from './src/components/CurrentWeatherCard';
import { HourlyForecast } from './src/components/HourlyForecast';
import { DailyForecast } from './src/components/DailyForecast';
import { WeatherMetrics } from './src/components/WeatherMetrics';
import { CitySearchModal } from './src/components/CitySearchModal';

function WeatherMain() {
  const insets = useSafeAreaInsets();
  const [currentLocation, setCurrentLocation] = useState<LocationItem>(DEFAULT_LOCATION);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchVisible, setSearchVisible] = useState(false);

  const loadWeather = useCallback(async (location: LocationItem, isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
    } catch (err: any) {
      setError(err?.message || 'Không thể tải dữ liệu thời tiết. Vui lòng thử lại.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadWeather(currentLocation);
  }, [currentLocation, loadWeather]);

  const handleRefresh = () => {
    loadWeather(currentLocation, true);
  };

  const handleSelectCity = (city: LocationItem) => {
    setCurrentLocation(city);
  };

  // Xác định màu nền ứng dụng dựa theo thời tiết hiện tại
  const weatherInfo = weatherData
    ? getWeatherInfo(weatherData.current.weatherCode, weatherData.current.isDay)
    : getWeatherInfo(0, 1);

  const bgGradientColor = weatherInfo.backgroundTheme.gradient[0];
  const cardBg = weatherInfo.backgroundTheme.cardBg;
  const textColor = weatherInfo.backgroundTheme.textPrimary;

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    (StatusBar as any).setBackgroundColor?.(bgGradientColor, true);
  }, [bgGradientColor]);

  if (loading && !weatherData) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: '#0284c7', paddingTop: insets.top }]}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Đang tải dữ liệu thời tiết Open-Meteo...</Text>
      </View>
    );
  }

  if (error && !weatherData) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: '#1e293b', paddingTop: insets.top }]}>
        <StatusBar barStyle="light-content" />
        <AlertCircle size={48} color="#f87171" style={{ marginBottom: 12 }} />
        <Text style={styles.errorTitle}>Không có kết nối</Text>
        <Text style={styles.errorDescription}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => loadWeather(currentLocation)}
        >
          <Text style={styles.retryText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bgGradientColor, paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />

      {/* Header bar */}
      <HeaderBar
        location={currentLocation}
        onOpenSearch={() => setSearchVisible(true)}
        textColor={textColor}
      />

      {/* Main scroll content */}
      {weatherData && (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#ffffff"
              colors={['#0284c7', '#38bdf8']}
            />
          }
        >
          {/* Thời tiết hiện tại */}
          <CurrentWeatherCard
            current={weatherData.current}
            todayForecast={weatherData.daily[0]}
            textColor={textColor}
          />

          {/* Dự báo theo giờ */}
          <HourlyForecast
            hourly={weatherData.hourly}
            cardBg={cardBg}
            textColor={textColor}
          />

          {/* Dự báo 7 ngày */}
          <DailyForecast
            daily={weatherData.daily}
            cardBg={cardBg}
            textColor={textColor}
          />

          {/* Các chỉ số chi tiết */}
          <WeatherMetrics
            current={weatherData.current}
            todayForecast={weatherData.daily[0]}
            cardBg={cardBg}
            textColor={textColor}
          />

          {/* Nguồn API footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: textColor }]}>
              Dữ liệu thời tiết theo thời gian thực từ Open-Meteo API
            </Text>
          </View>
        </ScrollView>
      )}

      {/* Modal tìm kiếm thành phố */}
      <CitySearchModal
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
        onSelectCity={handleSelectCity}
        currentLocation={currentLocation}
      />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <WeatherMain />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  errorDescription: {
    color: '#cbd5e1',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#0284c7',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  retryText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    opacity: 0.7,
  },
  footerText: {
    fontSize: 11,
    letterSpacing: 0.2,
  },
});
