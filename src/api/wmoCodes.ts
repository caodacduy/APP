export interface WeatherInfo {
  description: string;
  icon: string;
  backgroundTheme: {
    gradient: string[];
    cardBg: string;
    textPrimary: string;
    textSecondary: string;
  };
}

export function getWeatherInfo(code: number, isDay: number = 1): WeatherInfo {
  const isNight = isDay === 0;

  // Theme màu sắc theo ngày / đêm / điều kiện
  const nightTheme = {
    gradient: ['#0f172a', '#1e293b', '#334155'],
    cardBg: 'rgba(30, 41, 59, 0.7)',
    textPrimary: '#f8fafc',
    textSecondary: '#94a3b8',
  };

  const sunnyTheme = {
    gradient: ['#0284c7', '#38bdf8', '#7dd3fc'],
    cardBg: 'rgba(255, 255, 255, 0.25)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
  };

  const cloudyTheme = {
    gradient: ['#475569', '#64748b', '#94a3b8'],
    cardBg: 'rgba(255, 255, 255, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.85)',
  };

  const rainyTheme = {
    gradient: ['#1e293b', '#334155', '#475569'],
    cardBg: 'rgba(255, 255, 255, 0.15)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
  };

  const stormyTheme = {
    gradient: ['#18181b', '#27272a', '#3f3f46'],
    cardBg: 'rgba(255, 255, 255, 0.15)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
  };

  switch (code) {
    case 0:
      return {
        description: isNight ? 'Đêm quang đãng' : 'Trời quang đãng',
        icon: isNight ? '🌙' : '☀️',
        backgroundTheme: isNight ? nightTheme : sunnyTheme,
      };
    case 1:
      return {
        description: isNight ? 'Đêm ít mây' : 'Chủ yếu nắng đẹp',
        icon: isNight ? '🌤️' : '🌤️',
        backgroundTheme: isNight ? nightTheme : sunnyTheme,
      };
    case 2:
      return {
        description: 'Mây rải rác',
        icon: '⛅',
        backgroundTheme: isNight ? nightTheme : cloudyTheme,
      };
    case 3:
      return {
        description: 'Trời nhiều mây, u ám',
        icon: '☁️',
        backgroundTheme: isNight ? nightTheme : cloudyTheme,
      };
    case 45:
    case 48:
      return {
        description: 'Sương mù dày',
        icon: '🌫️',
        backgroundTheme: cloudyTheme,
      };
    case 51:
    case 53:
    case 55:
      return {
        description: 'Mưa phùn nhỏ',
        icon: '🌦️',
        backgroundTheme: rainyTheme,
      };
    case 56:
    case 57:
      return {
        description: 'Mưa phùn buốt giá',
        icon: '🌨️',
        backgroundTheme: rainyTheme,
      };
    case 61:
      return {
        description: 'Mưa rào nhẹ',
        icon: '🌧️',
        backgroundTheme: rainyTheme,
      };
    case 63:
      return {
        description: 'Mưa vừa',
        icon: '🌧️',
        backgroundTheme: rainyTheme,
      };
    case 65:
      return {
        description: 'Mưa to nặng hạt',
        icon: '🌧️🌧️',
        backgroundTheme: rainyTheme,
      };
    case 66:
    case 67:
      return {
        description: 'Mưa đá nhỏ',
        icon: '🌧️❄️',
        backgroundTheme: rainyTheme,
      };
    case 71:
    case 73:
    case 75:
      return {
        description: 'Tuyết rơi',
        icon: '❄️',
        backgroundTheme: cloudyTheme,
      };
    case 77:
      return {
        description: 'Tuyết lác đác',
        icon: '🌨️',
        backgroundTheme: cloudyTheme,
      };
    case 80:
    case 81:
    case 82:
      return {
        description: 'Mưa rào từng cơn',
        icon: '🌦️',
        backgroundTheme: rainyTheme,
      };
    case 85:
    case 86:
      return {
        description: 'Mưa tuyết rào',
        icon: '🌨️',
        backgroundTheme: cloudyTheme,
      };
    case 95:
      return {
        description: 'Dông có sấm sét',
        icon: '⛈️',
        backgroundTheme: stormyTheme,
      };
    case 96:
    case 99:
      return {
        description: 'Dông sét mưa đá nguy hiểm',
        icon: '⛈️⚡',
        backgroundTheme: stormyTheme,
      };
    default:
      return {
        description: 'Thời tiết bình thường',
        icon: isNight ? '🌙' : '☀️',
        backgroundTheme: isNight ? nightTheme : sunnyTheme,
      };
  }
}
