import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { calculateStreaks } from "../utils/streak";
import { getTodayDateString } from "../utils/date";
import { THEME } from "../theme";
import DotGrid from "./DotGrid";

export default function HabitCard({ habit, onToggleDate, onEdit }) {
  const todayStr = getTodayDateString();
  const isDoneToday = Boolean(habit.history && habit.history[todayStr]);
  const { currentStreak, bestStreak } = calculateStreaks(habit.history || {});

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        {/* Today check-in button */}
        <TouchableOpacity
          style={[styles.checkButton, isDoneToday && styles.checkButtonDone]}
          onPress={() => onToggleDate(habit.id, todayStr)}
          activeOpacity={0.7}
        >
          <Text style={[styles.checkIcon, isDoneToday && styles.checkIconDone]}>
            {isDoneToday ? "●" : "○"}
          </Text>
        </TouchableOpacity>

        {/* Habit info */}
        <View style={styles.titleContainer}>
          <Text style={styles.habitName} numberOfLines={1}>
            {habit.name}
          </Text>
          <View style={styles.streakRow}>
            <Text style={styles.streakText}>
              CURR: <Text style={styles.streakValue}>{currentStreak}d</Text>
            </Text>
            <Text style={styles.streakDivider}>|</Text>
            <Text style={styles.streakText}>
              BEST: <Text style={styles.streakValue}>{bestStreak}d</Text>
            </Text>
          </View>
        </View>

        {/* Action button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(habit)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.editButtonText}>EDIT</Text>
        </TouchableOpacity>
      </View>

      {/* 30-Day Dot Matrix */}
      <DotGrid
        history={habit.history || {}}
        onToggleDate={(dateStr) => onToggleDate(habit.id, dateStr)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.cardBg,
    borderRadius: 8,
    borderWidth: 2,
    padding: 16,
    marginBottom: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: THEME.cardBorder,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: THEME.text,
  },
  checkButtonDone: {
    borderColor: THEME.accent,
    backgroundColor: THEME.accent,
  },
  checkIcon: {
    fontFamily: THEME.fontFamily,
    fontSize: 24,
    color: THEME.accent,
    lineHeight: 24,
  },
  checkIconDone: {
    color: THEME.bg,
  },
  titleContainer: {
    flex: 1,
  },
  habitName: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.h5,
    fontWeight: "bold",
    color: THEME.bg,
    letterSpacing: 0.5,
  },
  streakRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  streakText: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.body,
    color: THEME.bg,
  },
  streakValue: {
    color: THEME.accent,
    fontWeight: "bold",
  },
  streakDivider: {
    marginHorizontal: 8,
    color: THEME.cardBorder,
    fontSize: THEME.type.body,
  },
  editButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: THEME.cardBorder,
    backgroundColor: THEME.bg,
  },
  editButtonText: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.body,
    color: THEME.text,
    fontWeight: "bold",
  },
});
