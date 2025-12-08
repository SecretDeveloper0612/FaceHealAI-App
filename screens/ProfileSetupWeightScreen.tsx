import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated as RNAnimated,
  TouchableOpacity,
  Dimensions,
  PanResponder,
} from 'react-native';

interface ProfileSetupWeightScreenProps {
  onBack?: () => void;
  onGetStarted?: (weight: number, unit: 'kg' | 'lbs') => void;
}

const { width } = Dimensions.get('window');

const MIN_WEIGHT = 30;
const MAX_WEIGHT = 200;
const SLIDER_WIDTH = width - 40;
const TICK_MARKS = 171; // 30 to 200 inclusive

export const ProfileSetupWeightScreen: React.FC<ProfileSetupWeightScreenProps> = ({
  onBack = () => {},
  onGetStarted = () => {},
}) => {
  const [selectedWeight, setSelectedWeight] = useState(70);
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');

  const backButtonOpacity = useRef(new RNAnimated.Value(0)).current;
  const titleOpacity = useRef(new RNAnimated.Value(0)).current;
  const subtitleOpacity = useRef(new RNAnimated.Value(0)).current;
  const unitsOpacity = useRef(new RNAnimated.Value(0)).current;
  const weightDisplayOpacity = useRef(new RNAnimated.Value(0)).current;
  const sliderOpacity = useRef(new RNAnimated.Value(0)).current;
  const buttonOpacity = useRef(new RNAnimated.Value(0)).current;
  const buttonTranslateY = useRef(new RNAnimated.Value(50)).current;
  const sliderPosition = useRef(new RNAnimated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Get the current position from the starting point
        const positionX = gestureState.moveX - 40; // Account for padding
        const clampedX = Math.max(0, Math.min(positionX, SLIDER_WIDTH));
        
        // Calculate weight based on position
        const newWeight = Math.round(
          MIN_WEIGHT + (clampedX / SLIDER_WIDTH) * (MAX_WEIGHT - MIN_WEIGHT)
        );
        
        setSelectedWeight(newWeight);
        sliderPosition.setValue(clampedX);
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Snap to nearest value
        const positionX = gestureState.moveX - 40;
        const clampedX = Math.max(0, Math.min(positionX, SLIDER_WIDTH));
        const newWeight = Math.round(
          MIN_WEIGHT + (clampedX / SLIDER_WIDTH) * (MAX_WEIGHT - MIN_WEIGHT)
        );
        
        // Animate to final position
        const finalPosition = ((newWeight - MIN_WEIGHT) / (MAX_WEIGHT - MIN_WEIGHT)) * SLIDER_WIDTH;
        RNAnimated.timing(sliderPosition, {
          toValue: finalPosition,
          duration: 200,
          useNativeDriver: true,
        }).start();
        
        setSelectedWeight(newWeight);
      },
    })
  ).current;

  useEffect(() => {
    const initialPosition = ((selectedWeight - MIN_WEIGHT) / (MAX_WEIGHT - MIN_WEIGHT)) * SLIDER_WIDTH;
    sliderPosition.setValue(initialPosition);

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

    // Units animation
    setTimeout(() => {
      RNAnimated.timing(unitsOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 600);

    // Weight display animation
    setTimeout(() => {
      RNAnimated.timing(weightDisplayOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 800);

    // Slider animation
    setTimeout(() => {
      RNAnimated.timing(sliderOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 1000);

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
    }, 1400);
  }, []);

  const handleGetStarted = () => {
    onGetStarted(selectedWeight, unit);
  };

  const toggleUnit = (newUnit: 'kg' | 'lbs') => {
    setUnit(newUnit);
  };

  const displayWeight = unit === 'lbs' ? Math.round(selectedWeight * 2.205) : selectedWeight;

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
          What's your Weight
        </RNAnimated.Text>

        <RNAnimated.Text
          style={[
            styles.subtitle,
            {
              opacity: subtitleOpacity,
            },
          ]}
        >
          Your Weight, Your Wellness Path
        </RNAnimated.Text>
      </View>

      {/* Unit Toggle */}
      <RNAnimated.View
        style={[
          styles.unitsContainer,
          {
            opacity: unitsOpacity,
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.unitButton, unit === 'kg' && styles.unitButtonActive]}
          onPress={() => toggleUnit('kg')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.unitText,
              unit === 'kg' && styles.unitTextActive,
            ]}
          >
            Kg
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.unitButton, unit === 'lbs' && styles.unitButtonActive]}
          onPress={() => toggleUnit('lbs')}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.unitText,
              unit === 'lbs' && styles.unitTextActive,
            ]}
          >
            Lbs
          </Text>
        </TouchableOpacity>
      </RNAnimated.View>

      {/* Weight Display */}
      <RNAnimated.View
        style={[
          styles.weightDisplayContainer,
          {
            opacity: weightDisplayOpacity,
          },
        ]}
      >
        <Text style={styles.weightValue}>{displayWeight}</Text>
        <Text style={styles.weightUnit}>{unit}</Text>
      </RNAnimated.View>

      {/* Slider */}
      <RNAnimated.View
        style={[
          styles.sliderContainer,
          {
            opacity: sliderOpacity,
          },
        ]}
      >
        <View style={styles.tickMarkContainer}>
          {Array.from({ length: TICK_MARKS }, (_, i) => {
            const weight = MIN_WEIGHT + i;
            const isLabel = weight % 10 === 0;
            return (
              <View key={`tick-${i}`} style={styles.tickColumn}>
                <View
                  style={[
                    styles.tickMark,
                    isLabel && styles.tickMarkLarge,
                  ]}
                />
                {isLabel && (
                  <Text style={styles.tickLabel}>{weight}</Text>
                )}
              </View>
            );
          })}
        </View>

        {/* Slider Track */}
        <View style={styles.sliderTrack} />

        {/* Slider Thumb */}
        <RNAnimated.View
          style={[
            styles.sliderThumb,
            {
              transform: [
                {
                  translateX: sliderPosition,
                },
              ],
            },
          ]}
          {...panResponder.panHandlers}
        />
      </RNAnimated.View>

      {/* Spacer */}
      <View style={{ flex: 1 }} />

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
          style={styles.getStartedButton}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.getStartedText}>Next</Text>
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
    fontSize: 30,
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
  unitsContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 40,
  },
  unitButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  unitButtonActive: {
    borderColor: '#2563EB',
  },
  unitText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
  unitTextActive: {
    color: '#2563EB',
  },
  weightDisplayContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  weightValue: {
    fontSize: 64,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -2,
  },
  weightUnit: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B92A9',
    marginTop: -8,
  },
  sliderContainer: {
    marginVertical: 40,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    height: 120,
    position: 'relative',
  },
  sliderTrack: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#333',
    top: 40,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  tickMarkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 80,
    marginBottom: 20,
    position: 'relative',
    zIndex: 2,
  },
  tickColumn: {
    alignItems: 'center',
    flex: 1,
  },
  tickMark: {
    width: 2,
    height: 8,
    backgroundColor: '#555',
    marginBottom: 8,
  },
  tickMarkLarge: {
    height: 16,
    backgroundColor: '#FFFFFF',
  },
  tickLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
  },
  sliderThumb: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    top: 24,
    left: -16,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonWrapper: {
    marginTop: 20,
  },
  getStartedButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
  });
