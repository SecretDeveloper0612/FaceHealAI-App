import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated as RNAnimated,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FONTS } from '../theme/fonts';

interface ProfileSetupAllergyScreenProps {
  onBack?: () => void;
  onGetStarted?: (allergies: string) => void;
}

const { width } = Dimensions.get('window');

export const ProfileSetupAllergyScreen: React.FC<ProfileSetupAllergyScreenProps> = ({
  onBack = () => { },
  onGetStarted = () => { },
}) => {
  const [allergies, setAllergies] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const backButtonOpacity = useRef(new RNAnimated.Value(0)).current;
  const titleOpacity = useRef(new RNAnimated.Value(0)).current;
  const subtitleOpacity = useRef(new RNAnimated.Value(0)).current;
  const inputOpacity = useRef(new RNAnimated.Value(0)).current;
  const inputScale = useRef(new RNAnimated.Value(0.95)).current;
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

    // Input animation
    setTimeout(() => {
      RNAnimated.parallel([
        RNAnimated.timing(inputOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        RNAnimated.timing(inputScale, {
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

  const handleGetStarted = () => {
    if (allergies.trim()) {
      onGetStarted(allergies.trim());
    }
  };

  const handleAllergyClick = (allergyName: string) => {
    const currentAllergies = allergies.trim();

    // Check if this allergy is already in the list
    const allergyList = currentAllergies
      .split(',')
      .map(a => a.trim())
      .filter(a => a.length > 0);

    if (allergyList.includes(allergyName)) {
      // Remove the allergy if it's already selected
      const updatedList = allergyList.filter(a => a !== allergyName);
      setAllergies(updatedList.join(', '));
    } else {
      // Add the allergy
      if (currentAllergies.length > 0) {
        setAllergies(currentAllergies + ', ' + allergyName);
      } else {
        setAllergies(allergyName);
      }
    }
  };

  const isAllergySelected = (allergyName: string) => {
    const allergyList = allergies
      .split(',')
      .map(a => a.trim())
      .filter(a => a.length > 0);
    return allergyList.includes(allergyName);
  };

  const isButtonDisabled = !allergies.trim();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
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
            Do you have any Allergy
          </RNAnimated.Text>

          <RNAnimated.Text
            style={[
              styles.subtitle,
              {
                opacity: subtitleOpacity,
              },
            ]}
          >
            Personal Relief—Pinpoint Your Allergies
          </RNAnimated.Text>
        </View>

        {/* Input Box */}
        <RNAnimated.View
          style={[
            styles.inputWrapper,
            {
              opacity: inputOpacity,
              transform: [{ scale: inputScale }],
            },
          ]}
        >
          <TextInput
            style={[
              styles.input,
              isFocused && styles.inputFocused,
            ]}
            placeholder="Enter about your Allergy"
            placeholderTextColor="#999"
            multiline
            numberOfLines={6}
            value={allergies}
            onChangeText={setAllergies}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            textAlignVertical="top"
          />
        </RNAnimated.View>

        {/* Allergy Examples */}
        <RNAnimated.View
          style={[
            styles.examplesContainer,
            {
              opacity: inputOpacity,
            },
          ]}
        >
          <Text style={styles.examplesTitle}>Common Examples:</Text>
          <View style={styles.examplesGrid}>
            <TouchableOpacity
              style={[
                styles.exampleTag,
                isAllergySelected('Peanuts') && styles.exampleTagSelected,
              ]}
              onPress={() => handleAllergyClick('Peanuts')}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.exampleText,
                isAllergySelected('Peanuts') && styles.exampleTextSelected,
              ]}>🥜 Peanuts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.exampleTag,
                isAllergySelected('Dairy') && styles.exampleTagSelected,
              ]}
              onPress={() => handleAllergyClick('Dairy')}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.exampleText,
                isAllergySelected('Dairy') && styles.exampleTextSelected,
              ]}>🥛 Dairy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.exampleTag,
                isAllergySelected('Shellfish') && styles.exampleTagSelected,
              ]}
              onPress={() => handleAllergyClick('Shellfish')}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.exampleText,
                isAllergySelected('Shellfish') && styles.exampleTextSelected,
              ]}>🦐 Shellfish</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.exampleTag,
                isAllergySelected('Eggs') && styles.exampleTagSelected,
              ]}
              onPress={() => handleAllergyClick('Eggs')}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.exampleText,
                isAllergySelected('Eggs') && styles.exampleTextSelected,
              ]}>🥚 Eggs</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.exampleTag,
                isAllergySelected('Gluten') && styles.exampleTagSelected,
              ]}
              onPress={() => handleAllergyClick('Gluten')}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.exampleText,
                isAllergySelected('Gluten') && styles.exampleTextSelected,
              ]}>🌾 Gluten</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.exampleTag,
                isAllergySelected('Tree Nuts') && styles.exampleTagSelected,
              ]}
              onPress={() => handleAllergyClick('Tree Nuts')}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.exampleText,
                isAllergySelected('Tree Nuts') && styles.exampleTextSelected,
              ]}>🌰 Tree Nuts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.exampleTag,
                isAllergySelected('Fish') && styles.exampleTagSelected,
              ]}
              onPress={() => handleAllergyClick('Fish')}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.exampleText,
                isAllergySelected('Fish') && styles.exampleTextSelected,
              ]}>🐟 Fish</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.exampleTag,
                isAllergySelected('Latex') && styles.exampleTagSelected,
              ]}
              onPress={() => handleAllergyClick('Latex')}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.exampleText,
                isAllergySelected('Latex') && styles.exampleTextSelected,
              ]}>🍓 Latex</Text>
            </TouchableOpacity>
          </View>
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
            style={[
              styles.getStartedButton,
              isButtonDisabled && styles.getStartedButtonDisabled,
            ]}
            onPress={handleGetStarted}
            activeOpacity={isButtonDisabled ? 1 : 0.8}
            disabled={isButtonDisabled}
          >
            <Text style={styles.getStartedText}>Next</Text>
          </TouchableOpacity>
        </RNAnimated.View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1419',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  backButtonContainer: {
    marginTop: 20,
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
    fontFamily: FONTS.POPPINS_BOLD,
  },
  headerSection: {
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontFamily: FONTS.POPPINS_BOLD,
    color: '#FFFFFF',
    marginBottom: 12,
    lineHeight: 46,
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FONTS.POPPINS_REGULAR,
    color: '#8B92A9',
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  inputWrapper: {
    marginBottom: 40,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 20,
    fontSize: 15,
    color: '#FFFFFF',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    minHeight: 160,
    fontFamily: FONTS.POPPINS_REGULAR,
    lineHeight: 24,
  },
  inputFocused: {
    borderColor: '#2563EB',
    backgroundColor: 'rgba(37, 99, 235, 0.12)',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
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
    opacity: 0.5,
  },
  getStartedText: {
    fontSize: 16,
    fontFamily: FONTS.POPPINS_BOLD,
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
  examplesContainer: {
    marginBottom: 20,
  },
  examplesTitle: {
    fontSize: 13,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: '#8B92A9',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  examplesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  exampleTag: {
    backgroundColor: 'rgba(37, 99, 235, 0.15)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.3)',
  },
  exampleTagSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  exampleText: {
    fontSize: 13,
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: '#2563EB',
    letterSpacing: 0.2,
  },
  exampleTextSelected: {
    color: '#FFFFFF',
    fontFamily: FONTS.POPPINS_BOLD,
  },
});
