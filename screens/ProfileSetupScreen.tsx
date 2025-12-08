import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated as RNAnimated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

interface ProfileSetupScreenProps {
  onBack?: () => void;
  onGetStarted?: (gender: string) => void;
}

const { width, height } = Dimensions.get('window');

type Gender = 'Male' | 'Female' | 'Other' | null;

export const ProfileSetupScreen: React.FC<ProfileSetupScreenProps> = ({
  onBack = () => {},
  onGetStarted = () => {},
}) => {
  const [selectedGender, setSelectedGender] = useState<Gender>(null);

  const backButtonOpacity = useRef(new RNAnimated.Value(0)).current;
  const titleOpacity = useRef(new RNAnimated.Value(0)).current;
  const subtitleOpacity = useRef(new RNAnimated.Value(0)).current;
  const maleTranslateY = useRef(new RNAnimated.Value(50)).current;
  const maleOpacity = useRef(new RNAnimated.Value(0)).current;
  const femaleTranslateY = useRef(new RNAnimated.Value(50)).current;
  const femaleOpacity = useRef(new RNAnimated.Value(0)).current;
  const otherTranslateY = useRef(new RNAnimated.Value(50)).current;
  const otherOpacity = useRef(new RNAnimated.Value(0)).current;
  const buttonOpacity = useRef(new RNAnimated.Value(0)).current;
  const buttonTranslateY = useRef(new RNAnimated.Value(50)).current;

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

    // Gender options animation
    setTimeout(() => {
      RNAnimated.parallel([
        RNAnimated.timing(maleTranslateY, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
        RNAnimated.timing(maleOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start();

      RNAnimated.parallel([
        RNAnimated.timing(femaleTranslateY, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
        RNAnimated.timing(femaleOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start();

      RNAnimated.parallel([
        RNAnimated.timing(otherTranslateY, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
        RNAnimated.timing(otherOpacity, {
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
  }, []);

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
  };

  const handleGetStarted = () => {
    if (selectedGender) {
      onGetStarted(selectedGender);
    }
  };

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
          Choose your Gender
        </RNAnimated.Text>

        <RNAnimated.Text
          style={[
            styles.subtitle,
            {
              opacity: subtitleOpacity,
            },
          ]}
        >
          Personalized Care, For Every You
        </RNAnimated.Text>
      </View>

      {/* Gender Options */}
      <View style={styles.optionsSection}>
        {/* Male Option */}
        <RNAnimated.View
          style={[
            styles.optionWrapper,
            {
              opacity: maleOpacity,
              transform: [{ translateY: maleTranslateY }],
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.option,
              selectedGender === 'Male' && styles.optionSelected,
            ]}
            onPress={() => handleGenderSelect('Male')}
            activeOpacity={0.75}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionIcon}>♂️</Text>
              <Text
                style={[
                  styles.optionText,
                  selectedGender === 'Male' && styles.optionTextSelected,
                ]}
              >
                Male
              </Text>
            </View>
          </TouchableOpacity>
        </RNAnimated.View>

        {/* Female Option */}
        <RNAnimated.View
          style={[
            styles.optionWrapper,
            {
              opacity: femaleOpacity,
              transform: [{ translateY: femaleTranslateY }],
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.option,
              selectedGender === 'Female' && styles.optionSelected,
            ]}
            onPress={() => handleGenderSelect('Female')}
            activeOpacity={0.75}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionIcon}>♀️</Text>
              <Text
                style={[
                  styles.optionText,
                  selectedGender === 'Female' && styles.optionTextSelected,
                ]}
              >
                Female
              </Text>
            </View>
          </TouchableOpacity>
        </RNAnimated.View>

        {/* Other Option */}
        <RNAnimated.View
          style={[
            styles.optionWrapper,
            {
              opacity: otherOpacity,
              transform: [{ translateY: otherTranslateY }],
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.option,
              selectedGender === 'Other' && styles.optionSelected,
            ]}
            onPress={() => handleGenderSelect('Other')}
            activeOpacity={0.75}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionIcon}>⚪</Text>
              <Text
                style={[
                  styles.optionText,
                  selectedGender === 'Other' && styles.optionTextSelected,
                ]}
              >
                Other
              </Text>
            </View>
          </TouchableOpacity>
        </RNAnimated.View>
      </View>

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
          style={[
            styles.getStartedButton,
            !selectedGender && styles.getStartedButtonDisabled,
          ]}
          onPress={handleGetStarted}
          activeOpacity={0.8}
          disabled={!selectedGender}
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
    marginBottom: 50,
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
  optionsSection: {
    gap: 12,
  },
  optionWrapper: {
    marginBottom: 6,
  },
  option: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 70,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionIcon: {
    fontSize: 32,
  },
  optionSelected: {
    backgroundColor: 'rgba(37, 99, 235, 0.15)',
    borderColor: 'rgba(37, 99, 235, 0.6)',
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  optionTextSelected: {
    color: '#2563EB',
    fontWeight: '700',
  },
  buttonWrapper: {
    marginTop: 40,
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
    opacity: 0.5,
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
});
