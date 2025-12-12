import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Animated as RNAnimated, Image, Dimensions } from 'react-native';
import { FONTS } from '../theme/fonts';

interface SplashScreenProps {
  onFinish?: () => void;
}

interface Particle {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
}

const { width, height } = Dimensions.get('window');

const generateParticles = (): Particle[] => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 1000,
    duration: 2000 + Math.random() * 2000,
    size: 8 + Math.random() * 12,
  }));
};

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish = () => { } }) => {
  const [particles] = useState(generateParticles());
  const logoScale = useRef(new RNAnimated.Value(0.8)).current;
  const logoOpacity = useRef(new RNAnimated.Value(0)).current;
  const titleOpacity = useRef(new RNAnimated.Value(0)).current;
  const subtitleOpacity = useRef(new RNAnimated.Value(0)).current;
  const particleAnimations = useRef(
    particles.map(() => ({
      translateY: new RNAnimated.Value(0),
      translateX: new RNAnimated.Value(0),
      opacity: new RNAnimated.Value(0),
      scale: new RNAnimated.Value(0),
    }))
  ).current;

  useEffect(() => {
    // Enhanced particle animations with varied movements
    particles.forEach((particle, index) => {
      const animations = particleAnimations[index];
      const startY = Math.random() * height;
      const endY = -100 - Math.random() * 200;
      const startX = (Math.random() - 0.5) * 100;
      const endX = (Math.random() - 0.5) * 150;

      setTimeout(() => {
        RNAnimated.loop(
          RNAnimated.parallel([
            // Vertical movement
            RNAnimated.timing(animations.translateY, {
              toValue: endY - startY,
              duration: particle.duration,
              useNativeDriver: true,
            }),
            // Horizontal drift
            RNAnimated.sequence([
              RNAnimated.timing(animations.translateX, {
                toValue: endX,
                duration: particle.duration / 2,
                useNativeDriver: true,
              }),
              RNAnimated.timing(animations.translateX, {
                toValue: startX,
                duration: particle.duration / 2,
                useNativeDriver: true,
              }),
            ]),
            // Fade in and out
            RNAnimated.sequence([
              RNAnimated.timing(animations.opacity, {
                toValue: 0.8,
                duration: particle.duration * 0.2,
                useNativeDriver: true,
              }),
              RNAnimated.timing(animations.opacity, {
                toValue: 0.8,
                duration: particle.duration * 0.6,
                useNativeDriver: true,
              }),
              RNAnimated.timing(animations.opacity, {
                toValue: 0,
                duration: particle.duration * 0.2,
                useNativeDriver: true,
              }),
            ]),
            // Pulsing scale
            RNAnimated.sequence([
              RNAnimated.timing(animations.scale, {
                toValue: 1.2,
                duration: particle.duration / 3,
                useNativeDriver: true,
              }),
              RNAnimated.timing(animations.scale, {
                toValue: 0.8,
                duration: particle.duration / 3,
                useNativeDriver: true,
              }),
              RNAnimated.timing(animations.scale, {
                toValue: 1,
                duration: particle.duration / 3,
                useNativeDriver: true,
              }),
            ]),
          ])
        ).start();
      }, particle.delay);
    });

    // Logo animation with bounce
    RNAnimated.parallel([
      RNAnimated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      RNAnimated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
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
    }, 400);

    // Subtitle animation with delay
    setTimeout(() => {
      RNAnimated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }, 600);

    // Auto finish after 3 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Gradient Background Circles */}
      <View style={styles.gradientCircle1} />
      <View style={styles.gradientCircle2} />

      {/* Enhanced Particle System */}
      {particles.map((particle, index) => {
        const animations = particleAnimations[index];
        const colors = ['#2563EB', '#06B6D4', '#EC4899', '#8B5CF6', '#10B981'];
        const selectedColor = colors[index % colors.length];
        const particleType = index % 4;

        return (
          <RNAnimated.View
            key={particle.id}
            style={[
              styles.particle,
              {
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                opacity: animations.opacity,
                transform: [
                  { translateY: animations.translateY },
                  { translateX: animations.translateX },
                  { scale: animations.scale },
                ],
              },
            ]}
          >
            {particleType === 0 && (
              // Glowing dot
              <View
                style={[
                  styles.glowDot,
                  {
                    width: particle.size,
                    height: particle.size,
                    borderRadius: particle.size / 2,
                    backgroundColor: selectedColor,
                    shadowColor: selectedColor,
                  },
                ]}
              />
            )}
            {particleType === 1 && (
              // Ring
              <View
                style={[
                  styles.ring,
                  {
                    width: particle.size * 1.5,
                    height: particle.size * 1.5,
                    borderRadius: (particle.size * 1.5) / 2,
                    borderColor: selectedColor,
                  },
                ]}
              />
            )}
            {particleType === 2 && (
              // Diamond
              <View
                style={[
                  styles.diamond,
                  {
                    width: particle.size,
                    height: particle.size,
                    backgroundColor: selectedColor,
                  },
                ]}
              />
            )}
            {particleType === 3 && (
              // Star-like shape
              <View
                style={[
                  styles.star,
                  {
                    width: particle.size,
                    height: particle.size,
                    backgroundColor: selectedColor,
                    shadowColor: selectedColor,
                  },
                ]}
              />
            )}
          </RNAnimated.View>
        );
      })}

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
        <View style={styles.logoGlow}>
          <Image
            source={require('../assets/Images/app-logo-image.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
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
        FaceHeal AI
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
        Elevate Your Skin Journey with AI
      </RNAnimated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E1A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  gradientCircle1: {
    position: 'absolute',
    top: -150,
    right: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    opacity: 0.5,
  },
  gradientCircle2: {
    position: 'absolute',
    bottom: -200,
    left: -150,
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: 'rgba(139, 92, 246, 0.08)',
    opacity: 0.4,
  },
  particle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowDot: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 8,
  },
  ring: {
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  diamond: {
    transform: [{ rotate: '45deg' }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5,
  },
  star: {
    borderRadius: 2,
    transform: [{ rotate: '45deg' }],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 6,
  },
  logoContainer: {
    marginBottom: 40,
    zIndex: 10,
  },
  logoGlow: {
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 10,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 30,
  },
  title: {
    fontSize: 42,
    fontFamily: FONTS.POPPINS_BOLD,
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -1,
    zIndex: 10,
    textShadowColor: 'rgba(37, 99, 235, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONTS.POPPINS_REGULAR,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
    zIndex: 10,
    letterSpacing: 0.5,
  },
});
