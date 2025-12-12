import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated as RNAnimated,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { FONTS } from '../theme/fonts';

interface ForgotPasswordScreenProps {
  onResetPassword?: (method: string) => void;
  onBack?: () => void;
}

interface ResetMethod {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
}

const { width, height } = Dimensions.get('window');

const RESET_METHODS: ResetMethod[] = [
  {
    id: 'email',
    title: 'Send via Email',
    description: 'Seamlessly reset your password via email address.',
    color: '#FF9500',
    icon: '✉️',
  },
  {
    id: '2fa',
    title: 'Send via 2FA',
    description: 'Seamlessly reset your password via 2 Factors.',
    color: '#2563EB',
    icon: '🔒',
  },
  {
    id: 'google',
    title: 'Send via Google Auth',
    description: 'Seamlessly reset your password via gAuth.',
    color: '#A855F7',
    icon: '🔐',
  },
  {
    id: 'apple',
    title: 'Send via Apple Auth',
    description: 'Seamlessly reset your password via gAuth.',
    color: '#14B8A6',
    icon: '🍎',
  },
];

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onResetPassword = () => { },
  onBack = () => { },
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const backgroundOpacity = useRef(new RNAnimated.Value(0)).current;
  const titleOpacity = useRef(new RNAnimated.Value(0)).current;
  const subtitleOpacity = useRef(new RNAnimated.Value(0)).current;
  const methodsOpacity = useRef(new RNAnimated.Value(0)).current;
  const buttonOpacity = useRef(new RNAnimated.Value(0)).current;

  useEffect(() => {
    // Background fade in
    RNAnimated.timing(backgroundOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Title animation
    setTimeout(() => {
      RNAnimated.timing(titleOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 300);

    // Subtitle animation
    setTimeout(() => {
      RNAnimated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 600);

    // Methods animation
    setTimeout(() => {
      RNAnimated.timing(methodsOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 900);

    // Button animation
    setTimeout(() => {
      RNAnimated.timing(buttonOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 1200);
  }, []);

  const handleResetPassword = () => {
    if (selectedMethod) {
      onResetPassword(selectedMethod);
    }
  };

  const isButtonDisabled = !selectedMethod;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Background Image with Overlay */}
      <RNAnimated.View
        style={[
          styles.backgroundContainer,
          { opacity: backgroundOpacity },
        ]}
      >
        <ImageBackground
          source={require('../assets/Images/GET-STARTED-IMAGE.jpg')}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
        </ImageBackground>
      </RNAnimated.View>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        activeOpacity={0.7}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title */}
        <RNAnimated.Text
          style={[
            styles.title,
            {
              opacity: titleOpacity,
            },
          ]}
        >
          Reset Password
        </RNAnimated.Text>

        {/* Subtitle */}
        <RNAnimated.Text
          style={[
            styles.subtitle,
            {
              opacity: subtitleOpacity,
            },
          ]}
        >
          Select what method you'd like to reset.
        </RNAnimated.Text>

        {/* Reset Methods */}
        <RNAnimated.View
          style={[
            styles.methodsContainer,
            {
              opacity: methodsOpacity,
            },
          ]}
        >
          {RESET_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodCard,
                selectedMethod === method.id && styles.methodCardSelected,
              ]}
              onPress={() => setSelectedMethod(method.id)}
              activeOpacity={0.8}
            >
              {/* Icon Container */}
              <View
                style={[
                  styles.methodIconContainer,
                  { backgroundColor: method.color },
                ]}
              >
                <Text style={styles.methodIcon}>{method.icon}</Text>
              </View>

              {/* Text Container */}
              <View style={styles.methodTextContainer}>
                <Text style={styles.methodTitle}>{method.title}</Text>
                <Text style={styles.methodDescription}>
                  {method.description}
                </Text>
              </View>

              {/* Selection Indicator */}
              <View
                style={[
                  styles.selectionCircle,
                  selectedMethod === method.id && styles.selectionCircleSelected,
                ]}
              >
                {selectedMethod === method.id && (
                  <View style={styles.selectionDot} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </RNAnimated.View>

        {/* Reset Password Button */}
        <RNAnimated.View
          style={[
            styles.buttonContainer,
            {
              opacity: buttonOpacity,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.resetButton,
              isButtonDisabled && styles.resetButtonDisabled,
            ]}
            onPress={handleResetPassword}
            activeOpacity={isButtonDisabled ? 1 : 0.8}
            disabled={isButtonDisabled}
          >
            <Text style={styles.resetButtonText}>Reset Password</Text>
          </TouchableOpacity>
        </RNAnimated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height: height * 0.35,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  backButton: {
    position: 'absolute',
    top: 80,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  backButtonText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: FONTS.POPPINS_SEMIBOLD,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 120,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: FONTS.POPPINS_BOLD,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONTS.POPPINS_REGULAR,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  methodsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  methodCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  methodCardSelected: {
    borderColor: '#2563EB',
  },
  methodIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  methodIcon: {
    fontSize: 24,
  },
  methodTextContainer: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: '#000000',
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 13,
    fontFamily: FONTS.POPPINS_REGULAR,
    color: '#999999',
    lineHeight: 18,
  },
  selectionCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  selectionCircleSelected: {
    borderColor: '#2563EB',
  },
  selectionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2563EB',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonDisabled: {
    backgroundColor: '#1e40af',
    opacity: 0.5,
  },
  resetButtonText: {
    fontSize: 18,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});
