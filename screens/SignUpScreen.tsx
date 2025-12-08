import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Animated as RNAnimated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';

interface SignUpScreenProps {
  onSignUpSuccess?: () => void;
  onSignIn?: () => void;
  onBack?: () => void;
}

const { width, height } = Dimensions.get('window');

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  onSignUpSuccess = () => {},
  onSignIn = () => {},
  onBack = () => {},
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const backButtonOpacity = useRef(new RNAnimated.Value(0)).current;
  const logoOpacity = useRef(new RNAnimated.Value(0)).current;
  const titleOpacity = useRef(new RNAnimated.Value(0)).current;
  const formOpacity = useRef(new RNAnimated.Value(0)).current;
  const formTranslateY = useRef(new RNAnimated.Value(50)).current;
  const buttonOpacity = useRef(new RNAnimated.Value(0)).current;

  useEffect(() => {
    // Back button animation
    RNAnimated.timing(backButtonOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Logo animation
    RNAnimated.timing(logoOpacity, {
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
    }, 300);

    // Form animation
    setTimeout(() => {
      RNAnimated.parallel([
        RNAnimated.timing(formOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        RNAnimated.timing(formTranslateY, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start();
    }, 600);

    // Buttons animation
    setTimeout(() => {
      RNAnimated.timing(buttonOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 1000);
  }, []);

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (password && text !== password) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  const handleSignUp = () => {
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Here you would typically make an API call to sign up
    onSignUpSuccess();
  };

  const handleGoogleSignUp = () => {
    // Google sign up logic
    console.log('Google sign up');
  };

  const handleAppleSignUp = () => {
    // Apple sign up logic
    console.log('Apple sign up');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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

        {/* Background Gradient */}
        <View style={styles.backgroundGradient} />

        {/* Logo */}
        <RNAnimated.View
          style={[
            styles.logoContainer,
            {
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

        {/* Title Section */}
        <RNAnimated.View
          style={[
            styles.titleSection,
            {
              opacity: titleOpacity,
            },
          ]}
        >
          <Text style={styles.title}>Sign Up for Free</Text>
          <Text style={styles.subtitle}>
            Quickly make your account in 1 minute
          </Text>
        </RNAnimated.View>

        {/* Form Section */}
        <RNAnimated.View
          style={[
            styles.formSection,
            {
              opacity: formOpacity,
              transform: [{ translateY: formTranslateY }],
            },
          ]}
        >
          {/* Name Input */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Name</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Enter Your Name"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          {/* Email Input */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputIcon}>✉️</Text>
              <TextInput
                style={[styles.input, { paddingLeft: 16 }]}
                placeholder="Enter Your Email"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={[styles.input, { paddingLeft: 16 }]}
                placeholder="Enter Password"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                <Text style={styles.eyeIcon}>
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <View
              style={[
                styles.inputBox,
                passwordMismatch && styles.inputBoxError,
              ]}
            >
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={[styles.input, { paddingLeft: 16 }]}
                placeholder="Confirm Password"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                activeOpacity={0.7}
              >
                <Text style={styles.eyeIcon}>
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>
            {passwordMismatch && (
              <Text style={styles.errorText}>Passwords do not match</Text>
            )}
          </View>
        </RNAnimated.View>

        {/* Buttons Section */}
        <RNAnimated.View
          style={[
            styles.buttonSection,
            {
              opacity: buttonOpacity,
            },
          ]}
        >
          {/* Sign Up Button */}
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSignUp}
            activeOpacity={0.8}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          {/* Google Sign Up */}
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleGoogleSignUp}
            activeOpacity={0.8}
          >
            <View style={styles.googleLogoContainer}>
              <Text style={styles.googleLogoG}>G</Text>
            </View>
            <Text style={styles.socialButtonText}>Sign in with Google</Text>
          </TouchableOpacity>

          {/* Apple Sign Up */}
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleAppleSignUp}
            activeOpacity={0.8}
          >
            <Image
              source={require('../assets/Images/apple-logo.png')}
              style={styles.socialButtonIcon}
            />
            <Text style={styles.socialButtonText}>Sign in with Apple</Text>
          </TouchableOpacity>

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={onSignIn} activeOpacity={0.7}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </RNAnimated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1419',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backButtonContainer: {
    marginBottom: 20,
    marginTop: 50,
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
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.3,
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#8B92A9',
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  formSection: {
    marginBottom: 24,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  inputBoxError: {
    borderColor: '#EF4444',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    padding: 0,
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  eyeIcon: {
    fontSize: 18,
    marginLeft: 8,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
    marginTop: 8,
    letterSpacing: 0.2,
  },
  buttonSection: {
    marginBottom: 20,
  },
  signUpButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 20,
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dividerText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#8B92A9',
    letterSpacing: 0.2,
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  socialIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  socialButtonIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  googleLogoContainer: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#4285F4',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  googleLogoG: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  socialButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 0.2,
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#8B92A9',
    letterSpacing: 0.2,
  },
  signInLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
    letterSpacing: 0.2,
  },
});
