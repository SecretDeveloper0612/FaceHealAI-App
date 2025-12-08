import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated as RNAnimated,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';

interface SignInScreenProps {
  onSignIn?: (email: string, password: string) => void;
  onSignUp?: () => void;
  onForgotPassword?: () => void;
  onGoogleSignIn?: () => void;
  onAppleSignIn?: () => void;
  onBack?: () => void;
}

const { width, height } = Dimensions.get('window');

export const SignInScreen: React.FC<SignInScreenProps> = ({
  onSignIn = () => {},
  onSignUp = () => {},
  onForgotPassword = () => {},
  onGoogleSignIn = () => {},
  onAppleSignIn = () => {},
  onBack = () => {},
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const backButtonOpacity = useRef(new RNAnimated.Value(0)).current;
  const backgroundOpacity = useRef(new RNAnimated.Value(0)).current;
  const logoOpacity = useRef(new RNAnimated.Value(0)).current;
  const titleOpacity = useRef(new RNAnimated.Value(0)).current;
  const subtitleOpacity = useRef(new RNAnimated.Value(0)).current;
  const emailOpacity = useRef(new RNAnimated.Value(0)).current;
  const passwordOpacity = useRef(new RNAnimated.Value(0)).current;
  const signInButtonOpacity = useRef(new RNAnimated.Value(0)).current;
  const socialButtonsOpacity = useRef(new RNAnimated.Value(0)).current;
  const linksOpacity = useRef(new RNAnimated.Value(0)).current;

  useEffect(() => {
    // Back button animation
    RNAnimated.timing(backButtonOpacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Background fade in
    RNAnimated.timing(backgroundOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Logo animation
    setTimeout(() => {
      RNAnimated.timing(logoOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 300);

    // Title animation
    setTimeout(() => {
      RNAnimated.timing(titleOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 500);

    // Subtitle animation
    setTimeout(() => {
      RNAnimated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 700);

    // Email field animation
    setTimeout(() => {
      RNAnimated.timing(emailOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 900);

    // Password field animation
    setTimeout(() => {
      RNAnimated.timing(passwordOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 1100);

    // Sign In button animation
    setTimeout(() => {
      RNAnimated.timing(signInButtonOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 1300);

    // Social buttons animation
    setTimeout(() => {
      RNAnimated.timing(socialButtonsOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 1500);

    // Links animation
    setTimeout(() => {
      RNAnimated.timing(linksOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }, 1700);
  }, []);

  // Email validation regex
  const validateEmail = (emailValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  // Password validation
  const validatePassword = (passwordValue: string) => {
    return passwordValue.length >= 6;
  };

  const handleEmailChange = (emailValue: string) => {
    setEmail(emailValue);
    if (emailValue.trim()) {
      if (validateEmail(emailValue)) {
        setEmailError('');
      } else {
        setEmailError('Please enter a valid email address');
      }
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (passwordValue: string) => {
    setPassword(passwordValue);
    if (passwordValue) {
      if (validatePassword(passwordValue)) {
        setPasswordError('');
      } else {
        setPasswordError('Password must be at least 6 characters');
      }
    } else {
      setPasswordError('');
    }
  };

  const isEmailValid = email.trim() && validateEmail(email);
  const isPasswordValid = password && validatePassword(password);
  const isSignInDisabled = !isEmailValid || !isPasswordValid;

  const handleSignIn = () => {
    if (!isSignInDisabled) {
      onSignIn(email, password);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
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

         {/* Background Image */}
        <RNAnimated.View
          style={[
            styles.backgroundContainer,
            { opacity: backgroundOpacity },
          ]}
        >
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=900&fit=crop',
            }}
            style={styles.background}
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
            Sign In To FaceHeal AI
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
            Let's personalize your Face Health with AI
          </RNAnimated.Text>

          {/* Email Field */}
          <RNAnimated.View
            style={[
              styles.fieldContainer,
              {
                opacity: emailOpacity,
              },
            ]}
          >
            <View style={styles.labelRow}>
              <Text style={styles.label}>Email Address</Text>
              {isEmailValid && (
                <Text style={styles.validText}>✓ Valid</Text>
              )}
            </View>
            <View
              style={[
                styles.inputBox,
                emailFocused && styles.inputBoxFocused,
                emailError && styles.inputBoxError,
                isEmailValid && styles.inputBoxSuccess,
              ]}
            >
              <Text style={styles.fieldIcon}>✉️</Text>
              <TextInput
                style={styles.input}
                placeholder="elementary221b@gmail.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={handleEmailChange}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                keyboardType="email-address"
              />
              {isEmailValid && (
                <Text style={styles.successIcon}>✓</Text>
              )}
            </View>
            {emailError && (
              <Text style={styles.errorText}>{emailError}</Text>
            )}
          </RNAnimated.View>

          {/* Password Field */}
          <RNAnimated.View
            style={[
              styles.fieldContainer,
              {
                opacity: passwordOpacity,
              },
            ]}
          >
            <View style={styles.labelRow}>
              <Text style={styles.label}>Password</Text>
              {isPasswordValid && (
                <Text style={styles.validText}>✓ Valid</Text>
              )}
            </View>
            <View
              style={[
                styles.inputBox,
                passwordFocused && styles.inputBoxFocused,
                passwordError && styles.inputBoxError,
                isPasswordValid && styles.inputBoxSuccess,
              ]}
            >
              <Text style={styles.fieldIcon}>🔒</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••••••"
                placeholderTextColor="#999"
                value={password}
                onChangeText={handlePasswordChange}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Text style={styles.eyeText}>
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
              {isPasswordValid && (
                <Text style={styles.successIcon}>✓</Text>
              )}
            </View>
            {passwordError && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}
          </RNAnimated.View>

          {/* Sign In Button */}
          <RNAnimated.View
            style={[
              styles.buttonContainer,
              {
                opacity: signInButtonOpacity,
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.signInButton,
                isSignInDisabled && styles.signInButtonDisabled,
              ]}
              onPress={handleSignIn}
              activeOpacity={isSignInDisabled ? 1 : 0.8}
              disabled={isSignInDisabled}
            >
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
          </RNAnimated.View>

          {/* Social Buttons */}
          <RNAnimated.View
            style={[
              styles.socialContainer,
              {
                opacity: socialButtonsOpacity,
              },
            ]}
          >
            {/* Google Sign In */}
            <TouchableOpacity
              style={styles.socialButton}
              onPress={onGoogleSignIn}
              activeOpacity={0.8}
            >
              <Text style={styles.googleIcon}>🔵</Text>
              <Text style={styles.socialButtonText}>Sign in with Google</Text>
            </TouchableOpacity>

            {/* Apple Sign In */}
            <TouchableOpacity
              style={styles.socialButton}
              onPress={onAppleSignIn}
              activeOpacity={0.8}
            >
              <Text style={styles.appleIcon}>🍎</Text>
              <Text style={styles.socialButtonText}>Sign in with Apple</Text>
            </TouchableOpacity>
          </RNAnimated.View>

          {/* Social Media Icons */}
          <View style={styles.socialIconsContainer}>
            <TouchableOpacity style={styles.socialIcon}>
              <Text style={styles.socialIconText}>📷</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Text style={styles.socialIconText}>f</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Text style={styles.socialIconText}>in</Text>
            </TouchableOpacity>
          </View>

          {/* Links */}
          <RNAnimated.View
            style={[
              styles.linksContainer,
              {
                opacity: linksOpacity,
              },
            ]}
          >
            <View style={styles.signUpRow}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={onSignUp}>
                <Text style={styles.signUpLink}>Sign Up.</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={onForgotPassword}>
              <Text style={styles.forgotPasswordLink}>Forgot Password</Text>
            </TouchableOpacity>
          </RNAnimated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height: height * 0.5,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButtonContainer: {
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 20,
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  validText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
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
  inputBoxFocused: {
    borderColor: '#2563EB',
  },
  inputBoxError: {
    borderColor: '#EF4444',
  },
  inputBoxSuccess: {
    borderColor: '#10B981',
  },
  fieldIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    paddingVertical: 8,
  },
  eyeIcon: {
    padding: 8,
    marginLeft: 8,
  },
  eyeText: {
    fontSize: 18,
  },
  successIcon: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '500',
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButtonDisabled: {
    backgroundColor: '#1e40af',
    opacity: 0.5,
  },
  signInButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  socialContainer: {
    gap: 12,
    marginBottom: 30,
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  googleIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  appleIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
  },
  socialIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconText: {
    fontSize: 22,
    color: '#2563EB',
  },
  linksContainer: {
    alignItems: 'center',
    gap: 16,
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
    color: '#999999',
  },
  signUpLink: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  forgotPasswordLink: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
