import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { THEME } from '../theme';

export default function EmptyState({ onAddPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.dotMatrixGraphic}>
        <Text style={styles.dotsRowMuted}>○ ○ ○ ○ ○</Text>
        <Text style={styles.dotsRow}>○ <Text style={styles.dotAccent}>● ● ●</Text> ○</Text>
        <Text style={styles.dotsRow}>○ <Text style={styles.dotAccent}>●</Text>   <Text style={styles.dotAccent}>●</Text> ○</Text>
        <Text style={styles.dotsRow}>○ <Text style={styles.dotAccent}>● ● ●</Text> ○</Text>
        <Text style={styles.dotsRowMuted}>○ ○ ○ ○ ○</Text>
      </View>

      <Text style={styles.title}>NO ACTIVE HABITS</Text>
      <Text style={styles.body}>
        Start small. Track your daily consistency with a 30-day dot matrix.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onAddPress}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>+ ADD YOUR FIRST HABIT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: THEME.bg,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: THEME.cardBorder,
    alignItems: 'center',
    marginVertical: 40,
  },
  dotMatrixGraphic: {
    marginBottom: 20,
    alignItems: 'center',
  },
  dotsRow: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.h5,
    color: THEME.text,
    letterSpacing: 6,
    lineHeight: 28,
  },
  dotsRowMuted: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.h5,
    color: THEME.text,
    letterSpacing: 6,
    lineHeight: 28,
  },
  dotAccent: {
    color: THEME.accent,
  },
  title: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.h5,
    fontWeight: 'bold',
    color: THEME.text,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  body: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.body,
    color: THEME.text,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    maxWidth: 280,
  },
  button: {
    backgroundColor: THEME.accent,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
  },
  buttonText: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.body,
    fontWeight: 'bold',
    color: THEME.bg,
    letterSpacing: 0.5,
  },
});
