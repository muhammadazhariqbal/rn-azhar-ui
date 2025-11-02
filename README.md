# Azhar UI

A collection of reusable UI components for React Native.

## Installation

```bash
npm install
# or
yarn install
```

## Running the Project

### Regular App

```bash
# Start Expo
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

### Storybook

View and develop components in isolation with Storybook.

**Mobile (React Native):**

```bash
# Start Storybook
npm run storybook

# iOS
npm run storybook:ios

# Android
npm run storybook:android
```

## Components

### Sliding Button

![Sliding Button](screenshots/sliding-button.gif)

An interactive sliding button with gesture controls and visual feedback.

**Features:**

- Slide-to-confirm interaction
- Animated color transition while dragging
- Auto-reset after completion
- Customizable text and callback

**Usage:**

```tsx
import { SlidingButton } from "./components/SlidingButton";

<SlidingButton
  text="Slide to Confirm"
  onPress={() => console.log("Confirmed!")}
/>;
```

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **Expo Router** - Navigation
- **Storybook** - Component development
- **TypeScript** - Type safety

## Key Dependencies

- `expo-linear-gradient` - Gradient components
- `@gorhom/bottom-sheet` - Bottom sheet UI
- `react-native-reanimated` - Animations
- `react-native-gesture-handler` - Gesture handling

## License

MIT
