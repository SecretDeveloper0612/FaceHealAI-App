import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Animated as RNAnimated, Image } from 'react-native';

interface SplashScreenProps {
  onFinish?: () => void;
}

interface Particle {
  id: number;
  left: number;
  delay: number;
}

const generateParticles = (): Particle[] => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: (i % 6) * 100,
  }));
};

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish = () => {} }) => {
  const [particles] = useState(generateParticles());
  const logoScale = useRef(new RNAnimated.Value(0.8)).current;
  const logoOpacity = useRef(new RNAnimated.Value(0)).current;
  const titleOpacity = useRef(new RNAnimated.Value(0)).current;
  const subtitleOpacity = useRef(new RNAnimated.Value(0)).current;
  const particleAnimations = useRef(
    particles.map(() => new RNAnimated.Value(0))
  ).current;

  useEffect(() => {
    // Particle animations
    particles.forEach((particle, index) => {
      setTimeout(() => {
        RNAnimated.sequence([
          RNAnimated.timing(particleAnimations[index], {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]).start();
      }, particle.delay);
    });

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
  }, [logoScale, logoOpacity, titleOpacity, subtitleOpacity, onFinish, particles]);

  return (
    <View style={styles.container}>
      {/* Particle Background */}
      {particles.map((particle, index) => {
        const startY = Math.random() * 200 - 100;
        const endY = Math.random() * -400 - 300;
        const colors = ['#2563EB', '#06B6D4', '#EC4899', '#8B5CF6'];
        const selectedColor = colors[index % colors.length];
        const particleType = index % 3;

        return (
          <RNAnimated.View
            key={particle.id}
            style={[
              styles.geometricParticle,
              {
                left: `${particle.left}%`,
                top: `${Math.random() * 100}%`,
                opacity: particleAnimations[index].interpolate({
                  inputRange: [0, 0.3, 0.7, 1],
                  outputRange: [0, 0.7, 0.5, 0],
                }),
                transform: [
                  {
                    translateY: particleAnimations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [startY, endY],
                    }),
                  },
                  {
                    rotate: particleAnimations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                  {
                    scale: particleAnimations[index].interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0.5, 1.2, 0.8],
                    }),
                  },
                ],
              },
            ]}
          >
            {particleType === 0 && (
              // Hexagon
              <View style={[styles.hexagon, { borderColor: selectedColor }]} />
            )}
            {particleType === 1 && (
              // Circle with blur effect
              <View
                style={[
                  styles.circleParticle,
                  {
                    backgroundColor: selectedColor,
                    shadowColor: selectedColor,
                  },
                ]}
              />
            )}
            {particleType === 2 && (
              // Square with rotation
              <View
                style={[
                  styles.squareParticle,
                  {
                    backgroundColor: selectedColor,
                    shadowColor: selectedColor,
                  },
                ]}
              />
            )}
          </RNAnimated.View>
        );
      })}

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
    overflow: 'hidden',
  },
  geometricParticle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hexagon: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: '#2563EB',
    transform: [{ rotate: '45deg' }],
  },
  circleParticle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 5,
  },
  squareParticle: {
    width: 12,
    height: 12,
    borderRadius: 3,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
  },
  logoContainer: {
    marginBottom: 60,
    zIndex: 10,
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
    zIndex: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#E8E8E8',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
    zIndex: 10,
  },
});
