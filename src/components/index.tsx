import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ScrollView,
    StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';

const WeatherCloudSunIcon = () => (
    <Svg width={36} height={26} viewBox="0 0 36 26" fill="none">
        <Circle cx="13" cy="10" r="7" fill="#F59E0B" />
        <Path
            d="M 11 23 h 15 a 6 6 0 0 0 1 -11.9 a 8 8 0 0 0 -14.8 -1.5 a 5.5 5.5 0 0 0 -1.2 13.4 z"
            fill="#60A5FA"
        />
    </Svg>
);

interface ForecastItem {
    id: string;
    time: string;
    temp: string;
}

const FORECAST_DATA: ForecastItem[] = [
    { id: '1', time: '18 giờ', temp: "30'C" },
    { id: '2', time: '18 giờ', temp: "30'C" },
    { id: '3', time: '18 giờ', temp: "30'C" },
    { id: '4', time: '18 giờ', temp: "30'C" },
    { id: '5', time: '18 giờ', temp: "30'C" },
    { id: '6', time: '18 giờ', temp: "30'C" },
    { id: '7', time: '18 giờ', temp: "30'C" },
];

export const SimpleWeatherScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        StatusBar.setBarStyle('dark-content');
        (StatusBar as any).setBackgroundColor?.('#ffffff', true);
    }, []);

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.searchWrapper}>
                <TextInput
                    style={styles.searchInput}
                    value={keyword}
                    onChangeText={setKeyword}
                    placeholder=""
                    autoFocus={false}
                    selectionColor="#000000"
                />
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.locationTitle}>Hoàng Quốc Việt</Text>
                <Text style={styles.temperatureTitle}>32'C</Text>
                <Text style={styles.weatherDescription}>
                    Chi tiết thời tiết trong ngàyBan ngày: Trời có mây, có lúc xuất hiện
                    mưa rào hoặc dông vài nơi đan xen với các kh...
                </Text>

                <View style={styles.bigCard}>
                    <Text style={styles.cardTimeText}>18 giờ</Text>
                    <Text style={styles.cardTempText}>30'C</Text>
                </View>

                {FORECAST_DATA.map(item => (
                    <View key={item.id} style={styles.rowCard}>
                        <Text style={styles.cardTimeText}>{item.time}</Text>
                        <View style={styles.rowRight}>
                            <WeatherCloudSunIcon />
                            <Text style={styles.cardTempText}>{item.temp}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default SimpleWeatherScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    searchWrapper: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 4,
    },
    searchInput: {
        height: 42,
        borderWidth: 1,
        borderColor: '#b0b7c3',
        borderRadius: 4,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#000000',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 32,
    },
    locationTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#111827',
        textAlign: 'center',
        marginTop: 8,
    },
    temperatureTitle: {
        fontSize: 52,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginVertical: 4,
    },
    weatherDescription: {
        fontSize: 13,
        color: '#374151',
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: 16,
        paddingHorizontal: 12,
    },
    bigCard: {
        height: 105,
        borderWidth: 1,
        borderColor: '#cfd4dc',
        borderRadius: 10,
        padding: 14,
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        marginBottom: 10,
    },
    cardTimeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    cardTempText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    rowCard: {
        height: 56,
        borderWidth: 1,
        borderColor: '#cfd4dc',
        borderRadius: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        marginBottom: 10,
    },
    rowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
});
