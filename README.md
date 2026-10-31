# Daily Dots

A minimalist, retro-styled daily habit tracker built with React Native and Expo. Focus on consistency through tactile 30-day dot matrices, intelligent streaks, and a strict archive-first philosophy.

---

## Features

- **Frictionless Habit Creation**: Name-only setup—no complex schedules or arbitrary point systems.
- **Today Check-Ins**: Quick 1-tap completion directly from the main feed with immediate visual feedback.
- **30-Day Retro Dot Matrix**: A chronological dot grid for every habit showing consistency over the past month.
- **Interactive Backfill**: Tap any past day in the dot grid to retroactively log or toggle completion.
- **Smart Streak Engine**:
  - **Current Streak**: Tracks consecutive daily check-ins. Preserves your streak throughout the day until midnight before resetting if yesterday was missed.
  - **Best Streak**: Automatically calculates your all-time longest streak across full habit history.
- **Archive-First Workflow**: Archive habits when taking a break without losing historical completion data. Restore them at any time.
- **Floating Bottom Pill Navigation**: A sleek floating pill navigation bar with active state highlights, transitioning smoothly between active and archived habits.
- **Offline & Private**: Built on `@react-native-async-storage/async-storage`—all habit data stays on your device.
- **Universal Cross-Platform**: Runs natively on iOS, Android, and Web browsers with zero layout shifts.

---

## Design System

Daily Dots follows a strict retro design language:

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| **Light** | `#F5F5F5` | Primary background, light elements, inverted text |
| **Dark** | `#202020` | Habit cards, headers, pill navbar, foreground text |
| **Accent Orange** | `#EE6C4D` | Active tab highlights, completed dots, active streaks |

### Typography
- **Primary Font**: [Bitcount Prop Single](https://fonts.google.com/specimen/Bitcount+Prop+Single) (pixel dot-matrix aesthetic).
- **Proportional Typescale**:
  - `h1`: 106.31px (Day number display)
  - `h2`: 70.88px
  - `h3`: 47.25px
  - `h4`: 31.50px (Headers / Greetings)
  - `h5`: 21.00px (Card titles, modal headings)
  - `body`: 14.00px (Labels, streaks, descriptions)

---

## Project Structure

```text
daily-dots/
├── assets/
│   ├── fonts/
│   │   ├── BitcountPropSingle-Regular.ttf
│   │   └── BitcountPropSingle-Bold.ttf
│   ├── Plus.svg                    # Custom dot-matrix plus icon
│   └── ...                         # App icons and splash screens
├── src/
│   ├── components/
│   │   ├── AddHabitModal.js        # Minimalist name-only habit creation modal
│   │   ├── EditHabitModal.js       # Rename and archive/restore modal
│   │   ├── DotGrid.js              # Interactive 30-day retro dot matrix
│   │   ├── EmptyState.js           # Retro ASCII/dot empty state
│   │   ├── FloatingNavbar.js       # Floating pill bottom navigation
│   │   ├── HabitCard.js            # Habit item with streak counters and check-in
│   │   ├── HugeIcon.js             # Cross-platform Hugeicons renderer
│   │   └── Icon.js                 # Universal raw SVG renderer
│   ├── utils/
│   │   ├── date.js                 # Date formatting and chronological range utilities
│   │   ├── storage.js              # Local persistence via AsyncStorage
│   │   └── streak.js               # Current & best streak calculation algorithms
│   ├── icons.js                    # Custom SVG path registry
│   └── theme.js                    # Colors, typescale, and typography tokens
├── App.js                          # Main application entry point & view controller
├── app.json                        # Expo app configuration
├── index.html                      # Web entry template with font links & SVG resets
├── index.js                        # Root component registration
└── package.json
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo Go](https://expo.dev/go) app on your mobile device (iOS or Android), or an iOS Simulator / Android Emulator.

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd daily-dots
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the Expo development server:
```bash
npm start
```

From the terminal menu, press:
- `w` to open in your web browser.
- `i` to run on iOS Simulator (macOS required).
- `a` to run on Android Emulator / connected device.
- Or scan the QR code using the **Expo Go** app on your physical mobile phone.

### Platform-Specific Commands

```bash
# Run directly on Web
npm run web

# Run directly on iOS
npm run ios

# Run directly on Android
npm run android
```

---

## Production Build & Export

To test the optimized production bundles:

```bash
# Export static Web bundle to dist/
npx expo export --platform web

# Export iOS bundle
npx expo export --platform ios

# Export Android bundle
npx expo export --platform android
```

---

## License

This project is licensed under the [MIT License](LICENSE).

