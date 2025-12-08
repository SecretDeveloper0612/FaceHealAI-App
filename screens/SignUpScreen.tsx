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
  const [passwordStrength, setPasswordStrength] = useState(0);

  const logoOpacity = useRef(new RNAnimated.Value(0)).current;
  const titleOpacity = useRef(new RNAnimated.Value(0)).current;
  const formOpacity = useRef(new RNAnimated.Value(0)).current;
  const formTranslateY = useRef(new RNAnimated.Value(50)).current;
  const buttonOpacity = useRef(new RNAnimated.Value(0)).current;

  useEffect(() => {
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

  const calculatePasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 6) strength += 1;
    if (pwd.length >= 8) strength += 1;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength += 1;
    if (/\d/.test(pwd)) strength += 1;
    if (/[!@#$%^&*]/.test(pwd)) strength += 1;
    return Math.min(strength, 4);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordStrength(calculatePasswordStrength(text));
    if (confirmPassword && text !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (password && text !== password) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
        return '#666666';
      case 1:
        return '#EF4444';
      case 2:
        return '#F97316';
      case 3:
        return '#EAB308';
      case 4:
        return '#10B981';
      default:
        return '#666666';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
        return '';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
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
                placeholderTextColor="rgba(255, 255, 255, 1)"
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
                placeholderTextColor="rgba(255, 255, 255, 1)"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.fieldContainer}>
            <View style={styles.passwordLabelContainer}>
              <Text style={styles.label}>Password</Text>
              {password && (
                <Text
                  style={[
                    styles.strengthText,
                    { color: getPasswordStrengthColor() },
                  ]}
                >
                  {getPasswordStrengthText()}
                </Text>
              )}
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                style={[styles.input, { paddingLeft: 16 }]}
                placeholder="Enter Password"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={handlePasswordChange}
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
            {password && (
              <View style={styles.strengthMeter}>
                <View
                  style={[
                    styles.strengthMeterFill,
                    {
                      width: `${(passwordStrength / 4) * 100}%`,
                      backgroundColor: getPasswordStrengthColor(),
                    },
                  ]}
                />
              </View>
            )}
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
                placeholderTextColor="rgba(255, 255, 255, 1)"
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
    backgroundColor: '#000000',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#000000',
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
    color: '#999999',
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  formSection: {
    marginBottom: 24,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  passwordLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 0,
    letterSpacing: 0.3,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 3,
    borderColor: '#333333',
  },
  inputBoxError: {
    borderColor: '#EF4444',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
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
  strengthMeter: {
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  strengthMeterFill: {
    height: '100%',
    borderRadius: 2,
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
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
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
    color: '#999999',
    letterSpacing: 0.2,
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
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
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#4285F4',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  googleLogoG: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
    letterSpacing: 0.2,
  },
  signInLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
    letterSpacing: 0.2,
    textDecorationLine: 'underline',
  },
});
