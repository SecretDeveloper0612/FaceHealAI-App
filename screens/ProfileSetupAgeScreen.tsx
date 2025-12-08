import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated as RNAnimated,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

interface ProfileSetupAgeScreenProps {
  onBack?: () => void;
  onGetStarted?: (date: Date) => void;
}

const { width, height } = Dimensions.get('window');

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const generateDays = () => Array.from({ length: 31 }, (_, i) => i + 1);
const generateYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 100 }, (_, i) => currentYear - i);
};

const ITEM_HEIGHT = 45;
const VISIBLE_ITEMS = 5;

export const ProfileSetupAgeScreen: React.FC<ProfileSetupAgeScreenProps> = ({
  onBack = () => {},
  onGetStarted = () => {},
}) => {
  const [selectedMonth, setSelectedMonth] = useState(8); // September
  const [selectedDay, setSelectedDay] = useState(17);
  const [selectedYear, setSelectedYear] = useState(2018);

  const backButtonOpacity = useRef(new RNAnimated.Value(0)).current;
  const titleOpacity = useRef(new RNAnimated.Value(0)).current;
  const subtitleOpacity = useRef(new RNAnimated.Value(0)).current;
  const pickerOpacity = useRef(new RNAnimated.Value(0)).current;
  const pickerScale = useRef(new RNAnimated.Value(0.95)).current;
  const buttonOpacity = useRef(new RNAnimated.Value(0)).current;
  const buttonTranslateY = useRef(new RNAnimated.Value(50)).current;

  const monthScrollRef = useRef<ScrollView | null>(null);
  const dayScrollRef = useRef<ScrollView | null>(null);
  const yearScrollRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    // Back button animation
    RNAnimated.timing(backButtonOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Title animation
    setTimeout(() => {
      RNAnimated.timing(titleOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 200);

    // Subtitle animation
    setTimeout(() => {
      RNAnimated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 400);

    // Picker animation
    setTimeout(() => {
      RNAnimated.parallel([
        RNAnimated.timing(pickerOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        RNAnimated.timing(pickerScale, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start();
    }, 600);

    // Button animation
    setTimeout(() => {
      RNAnimated.parallel([
        RNAnimated.timing(buttonOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        RNAnimated.timing(buttonTranslateY, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1200);

    // Scroll to initial values
    setTimeout(() => {
      monthScrollRef.current?.scrollTo({
        y: selectedMonth * ITEM_HEIGHT,
        animated: false,
      });
      dayScrollRef.current?.scrollTo({
        y: (selectedDay - 1) * ITEM_HEIGHT,
        animated: false,
      });
      yearScrollRef.current?.scrollTo({
        y: 0,
        animated: false,
      });
    }, 100);
  }, []);

  const calculateAge = (year: number, month: number, day: number): number => {
    const today = new Date();
    const birthDate = new Date(year, month, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const currentAge = calculateAge(selectedYear, selectedMonth, selectedDay);
  const isEligible = currentAge >= 18;

  const handleGetStarted = () => {
    if (isEligible) {
      const date = new Date(selectedYear, selectedMonth, selectedDay);
      onGetStarted(date);
    }
  };

  const handleMonthScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setSelectedMonth(Math.max(0, Math.min(index, MONTHS.length - 1)));
  };

  const handleDayScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setSelectedDay(Math.max(1, Math.min(index + 1, 31)));
  };

  const handleYearScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const years = generateYears();
    setSelectedYear(years[Math.max(0, Math.min(index, years.length - 1))]);
  };

  const renderPickerColumn = (
    items: (string | number)[],
    selectedIndex: number,
    onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void,
    scrollRef: React.RefObject<ScrollView | null>
  ) => (
    <View style={styles.pickerColumn}>
      <ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={onScroll}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={{ height: ITEM_HEIGHT * 2 }} />
        {items.map((item, index) => (
          <View key={`item-${index}`} style={styles.pickerItemContainer}>
            <Text
              style={[
                styles.pickerItem,
                index === selectedIndex && styles.pickerItemSelected,
              ]}
            >
              {item}
            </Text>
          </View>
        ))}
        <View style={{ height: ITEM_HEIGHT * 2 }} />
      </ScrollView>

      {/* Highlight overlay */}
      <View style={styles.pickerHighlight} pointerEvents="none" />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <RNAnimated.View
        style={[
          styles.backButtonContainer,
          {
            opacity: backButtonOpacity,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      </RNAnimated.View>

      {/* Header Section */}
      <View style={styles.headerSection}>
        <RNAnimated.Text
          style={[
            styles.title,
            {
              opacity: titleOpacity,
            },
          ]}
        >
          When were you born?
        </RNAnimated.Text>

        <RNAnimated.Text
          style={[
            styles.subtitle,
            {
              opacity: subtitleOpacity,
            },
          ]}
        >
          Select your birth date to personalize your care
        </RNAnimated.Text>
      </View>

      {/* iOS Style Picker */}
      <RNAnimated.View
        style={[
          styles.pickerContainer,
          {
            opacity: pickerOpacity,
            transform: [{ scale: pickerScale }],
          },
        ]}
      >
        <View style={styles.pickerBox}>
          {renderPickerColumn(MONTHS, selectedMonth, handleMonthScroll, monthScrollRef)}
          {renderPickerColumn(generateDays(), selectedDay - 1, handleDayScroll, dayScrollRef)}
          {renderPickerColumn(generateYears(), 0, handleYearScroll, yearScrollRef)}
        </View>

        {/* Top and Bottom Fade Overlay */}
        <View style={styles.fadeOverlayTop} pointerEvents="none" />
        <View style={styles.fadeOverlayBottom} pointerEvents="none" />
      </RNAnimated.View>

      {/* Spacer */}
      <View style={{ flex: 1 }} />

      {/* Age Warning */}
      {!isEligible && (
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>⚠️ You must be 18 or older to use this app</Text>
        </View>
      )}

      {/* Get Started Button */}
      <RNAnimated.View
        style={[
          styles.buttonWrapper,
          {
            opacity: buttonOpacity,
            transform: [{ translateY: buttonTranslateY }],
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.getStartedButton,
            !isEligible && styles.getStartedButtonDisabled,
          ]}
          onPress={handleGetStarted}
          activeOpacity={isEligible ? 0.8 : 1}
          disabled={!isEligible}
        >
          <Text style={styles.getStartedText}>
            {isEligible ? 'Next' : 'Age Restricted'}
          </Text>
        </TouchableOpacity>
      </RNAnimated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1419',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  backButtonContainer: {
    marginBottom: 30,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(37, 99, 235, 0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(37, 99, 235, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(37, 99, 235, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  backButtonText: {
    fontSize: 22,
    color: '#2563EB',
    fontWeight: '700',
  },
  headerSection: {
    marginBottom: 30,
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    lineHeight: 46,
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#8B92A9',
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  pickerContainer: {
    marginVertical: 30,
    borderRadius: 24,
    overflow: 'hidden',
  },
  pickerBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  pickerColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerItemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  pickerItem: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
  },
  pickerItemSelected: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
  },
  pickerHighlight: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(37, 99, 235, 0.3)',
    borderBottomColor: 'rgba(37, 99, 235, 0.3)',
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
    pointerEvents: 'none',
  },
  fadeOverlayTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT * 2,
    backgroundColor: 'rgba(15, 20, 25, 0.9)',
    pointerEvents: 'none' as any,
  },
  fadeOverlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT * 2,
    backgroundColor: 'rgba(15, 20, 25, 0.9)',
    pointerEvents: 'none' as any,
  },
  warningContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  warningText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#EF4444',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  buttonWrapper: {
    marginTop: 20,
  },
  getStartedButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  getStartedButtonDisabled: {
    backgroundColor: '#4B5563',
    shadowOpacity: 0,
    elevation: 0,
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
});
