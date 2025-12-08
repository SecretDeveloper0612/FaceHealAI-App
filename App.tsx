import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import { SplashScreen, WelcomeScreen, ProfileSetupScreen, ProfileSetupAgeScreen, ProfileSetupWeightScreen, ProfileSetupAllergyScreen, SignInScreen, SignUpScreen } from './screens';

type AppState = 'splash' | 'welcome' | 'profileSetup' | 'profileAge' | 'profileWeight' | 'profileAllergy' | 'signIn' | 'signUp' | 'main';

export default function App() {
  const [appState, setAppState] = useState<AppState>('splash');

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppState('welcome');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    // Navigate to profile setup screen
    console.log('Get Started pressed - navigating to profile setup');
    setAppState('profileSetup');
  };

  const handleWelcomeSignIn = () => {
    // Navigate to sign in screen
    console.log('Sign In from welcome pressed');
    setAppState('signIn');
  };

  const handleProfileSetupBack = () => {
    // Go back to welcome screen
    setAppState('welcome');
  };

  const handleProfileSetupComplete = (gender: string) => {
    // Navigate to age setup screen
    console.log('Gender selected:', gender);
    setAppState('profileAge');
  };

  const handleProfileAgeBack = () => {
    // Go back to gender screen
    setAppState('profileSetup');
  };

  const handleProfileAgeComplete = (date: Date) => {
    // Navigate to weight setup screen
    console.log('Age selected:', date);
    setAppState('profileWeight');
  };

  const handleProfileWeightBack = () => {
    // Go back to age screen
    setAppState('profileAge');
  };

  const handleProfileWeightComplete = (weight: number, unit: 'kg' | 'lbs') => {
    // Navigate to allergy screen
    console.log('Weight selected:', weight, unit);
    setAppState('profileAllergy');
  };

  const handleProfileAllergyBack = () => {
    // Go back to weight screen
    setAppState('profileWeight');
  };

  const handleProfileAllergyComplete = (allergies: string) => {
    // Complete profile setup and navigate to sign in screen
    console.log('Allergies entered:', allergies);
    setAppState('signIn');
  };

  const handleSignInComplete = (email: string, password: string) => {
    console.log('Sign in with email:', email);
    setAppState('main');
  };

  const handleSignInGoogleClick = () => {
    console.log('Google sign in clicked');
  };

  const handleSignInAppleClick = () => {
    console.log('Apple sign in clicked');
  };

  const handleSignUpClick = () => {
    console.log('Sign up clicked - navigate to sign up screen');
    setAppState('signUp');
  };

  const handleSignUpBack = () => {
    // Go back to sign in screen
    setAppState('signIn');
  };

  const handleSignUpSuccess = () => {
    // Navigate to main app after sign up
    console.log('Sign up successful');
    setAppState('main');
  };

  const handleForgotPasswordClick = () => {
    console.log('Forgot password clicked - navigate to reset screen');
  };

  if (appState === 'splash') {
    return (
      <View style={styles.container}>
        <SplashScreen onFinish={() => setAppState('welcome')} />
        <StatusBar barStyle="light-content" />
      </View>
    );
  }

  if (appState === 'welcome') {
    return (
      <View style={styles.container}>
        <WelcomeScreen
          onGetStarted={handleGetStarted}
          onSignIn={handleWelcomeSignIn}
        />
        <StatusBar barStyle="light-content" />
      </View>
    );
  }

  if (appState === 'profileSetup') {
    return (
      <View style={styles.container}>
        <ProfileSetupScreen
          onBack={handleProfileSetupBack}
          onGetStarted={handleProfileSetupComplete}
        />
        <StatusBar barStyle="light-content" />
      </View>
    );
  }

  if (appState === 'profileAge') {
    return (
      <View style={styles.container}>
        <ProfileSetupAgeScreen
          onBack={handleProfileAgeBack}
          onGetStarted={handleProfileAgeComplete}
        />
        <StatusBar barStyle="light-content" />
      </View>
    );
  }

  if (appState === 'profileWeight') {
    return (
      <View style={styles.container}>
        <ProfileSetupWeightScreen
          onBack={handleProfileWeightBack}
          onGetStarted={handleProfileWeightComplete}
        />
        <StatusBar barStyle="light-content" />
      </View>
    );
  }

  if (appState === 'profileAllergy') {
    return (
      <View style={styles.container}>
        <ProfileSetupAllergyScreen
          onBack={handleProfileAllergyBack}
          onGetStarted={handleProfileAllergyComplete}
        />
        <StatusBar barStyle="light-content" />
      </View>
    );
  }

  if (appState === 'signIn') {
    return (
      <View style={styles.container}>
        <SignInScreen
          onSignIn={handleSignInComplete}
          onSignUp={handleSignUpClick}
          onForgotPassword={handleForgotPasswordClick}
          onGoogleSignIn={handleSignInGoogleClick}
          onAppleSignIn={handleSignInAppleClick}
        />
        <StatusBar barStyle="light-content" />
      </View>
    );
  }

  if (appState === 'signUp') {
    return (
      <View style={styles.container}>
        <SignUpScreen
          onSignUpSuccess={handleSignUpSuccess}
          onSignIn={handleSignUpBack}
        />
        <StatusBar barStyle="light-content" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        {/* Your main app content will go here */}
      </View>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
