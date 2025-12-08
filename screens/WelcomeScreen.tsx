import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated as RNAnimated,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';

interface WelcomeScreenProps {
  onGetStarted?: () => void;
  onSignIn?: () => void;
}

const { width, height } = Dimensions.get('window');

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onGetStarted = () => {},
  onSignIn = () => {},
}) => {
  const backgroundOpacity = useRef(new RNAnimated.Value(0)).current;
  const logoScale = useRef(new RNAnimated.Value(0.8)).current;
  const logoOpacity = useRef(new RNAnimated.Value(0)).current;
  const titleOpacity = useRef(new RNAnimated.Value(0)).current;
  const subtitleOpacity = useRef(new RNAnimated.Value(0)).current;
  const buttonOpacity = useRef(new RNAnimated.Value(0)).current;
  const buttonTranslateY = useRef(new RNAnimated.Value(50)).current;
  const signInOpacity = useRef(new RNAnimated.Value(0)).current;

  useEffect(() => {
    // Background fade in
    RNAnimated.timing(backgroundOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Logo animation
    setTimeout(() => {
      RNAnimated.parallel([
        RNAnimated.timing(logoScale, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        RNAnimated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }, 300);

    // Title animation
    setTimeout(() => {
      RNAnimated.timing(titleOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 800);

    // Subtitle animation
    setTimeout(() => {
      RNAnimated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 1100);

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

    // Sign in text animation
    setTimeout(() => {
      RNAnimated.timing(signInOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 1700);
  }, []);

  return (
    <View style={styles.container}>
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

      {/* Content */}
      <View style={styles.content}>
        {/* Logo */}
        <RNAnimated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ scale: logoScale }],
              opacity: logoOpacity,
            },
          ]}
        >
          <Image
            source={require('../assets/Images/app-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </RNAnimated.View>

        {/* Title */}
        <RNAnimated.Text
          style={[
            styles.title,
            {
              opacity: titleOpacity,
            },
          ]}
        >
          Welcome To FaceHeal AI
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
          Where Skin Meets Intelligence
        </RNAnimated.Text>

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
            onPress={onGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </RNAnimated.View>

        {/* Sign In Link */}
        <RNAnimated.View
          style={[
            styles.signInContainer,
            {
              opacity: signInOpacity,
            },
          ]}
        >
          <Text style={styles.signInLabel}>Already have account? </Text>
          <TouchableOpacity onPress={onSignIn}>
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </RNAnimated.View>
      </View>
    </View>
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
    height,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'flex-start',
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 0,
    marginTop: 350,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#E0E0E0',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  buttonWrapper: {
    marginBottom: 24,
  },
  getStartedButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  getStartedText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signInLabel: {
    fontSize: 14,
    color: '#f8f5f5ff',
    fontWeight: '400',
  },
  signInLink: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
