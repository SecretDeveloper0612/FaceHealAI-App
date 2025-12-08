import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated as RNAnimated, Image } from 'react-native';

interface SplashScreenProps {
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish = () => {} }) => {
  const logoScale = useRef(new RNAnimated.Value(0.8)).current;
  const logoOpacity = useRef(new RNAnimated.Value(0)).current;
  const titleOpacity = useRef(new RNAnimated.Value(0)).current;
  const subtitleOpacity = useRef(new RNAnimated.Value(0)).current;

  useEffect(() => {
    // Logo animation
    RNAnimated.parallel([
      RNAnimated.timing(logoScale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      RNAnimated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Title animation with delay
    setTimeout(() => {
      RNAnimated.timing(titleOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 300);

    // Subtitle animation with delay
    setTimeout(() => {
      RNAnimated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 500);

    // Auto finish after 3 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [logoScale, logoOpacity, titleOpacity, subtitleOpacity, onFinish]);

  return (
    <View style={styles.container}>
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

      <RNAnimated.Text
        style={[
          styles.title,
          {
            opacity: titleOpacity,
          },
        ]}
      >
        FaceHeal AI
      </RNAnimated.Text>

      <RNAnimated.Text
        style={[
          styles.subtitle,
          {
            opacity: subtitleOpacity,
          },
        ]}
      >
        Elevate Your Skin Journey with AI
      </RNAnimated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 60,
  },
  logo: {
    width: 140,
    height: 140,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#E8E8E8',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
});
