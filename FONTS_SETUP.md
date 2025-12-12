# Font System Update

## Overview
The entire app now uses **Poppins** and **Inter** Google Fonts for a modern, attractive look.

## Fonts Installed
- **Poppins**: Primary font for headings and UI elements
  - Regular (400)
  - Medium (500)
  - Semibold (600)
  - Bold (700)

- **Inter**: Secondary font available for future use

## Font Mappings

All text styles now use `fontFamily` instead of `fontWeight`:

| Use Case | Font Family |
|----------|-------------|
| Body text, descriptions | `FONTS.POPPINS_REGULAR` |
| Labels, secondary text | `FONTS.POPPINS_MEDIUM` |
| Buttons, emphasis | `FONTS.POPPINS_SEMIBOLD` |
| Headings, titles | `FONTS.POPPINS_BOLD` |

## Implementation

1. **Created** `/theme/fonts.ts` - Font constants
2. **Updated** `App.tsx` - Font loading with `useFonts` hook
3. **Updated all screens** - Replaced `fontWeight` with `fontFamily`

### Screens Updated:
- WelcomeScreen
- SignInScreen
- ForgotPasswordScreen
- ProfileSetupScreen
- ProfileSetupAgeScreen
- ProfileSetupWeightScreen
- ProfileSetupAllergyScreen
- SignUpScreen
- SplashScreen

## Usage

Import fonts in any screen:

```typescript
import { FONTS } from '../theme/fonts';

// In StyleSheet:
title: {
  fontSize: 32,
  fontFamily: FONTS.POPPINS_BOLD,
  color: '#FFFFFF',
}
```

## Notes

- Fonts are loaded asynchronously on app startup
- The splash screen prevents showing until fonts are loaded
- Font loading is handled automatically by the `useFonts` hook
- All fontWeight declarations have been removed and replaced with fontFamily
