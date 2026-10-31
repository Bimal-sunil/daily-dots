import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  getLastNDays,
  getTodayDateString,
  formatFriendlyDate,
} from "../utils/date";
import { THEME } from "../theme";

export default function DotGrid({ history = {}, onToggleDate }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const days = getLastNDays(30);
  const todayStr = getTodayDateString();

  const handleDotPress = (dateStr) => {
    setSelectedDate(dateStr);
    onToggleDate(dateStr);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>30-DAY RETRO</Text>
        <Text style={styles.statusHint}>
          {selectedDate
            ? `${formatFriendlyDate(selectedDate)}: ${history[selectedDate] ? "DONE" : "MISSED"}`
            : "tap dot to toggle"}
        </Text>
      </View>

      <View style={styles.grid}>
        {days.map((dateStr) => {
          const isDone = Boolean(history[dateStr]);
          const isToday = dateStr === todayStr;
          const isSelected = selectedDate === dateStr;

          return (
            <TouchableOpacity
              key={dateStr}
              accessibilityLabel={`${formatFriendlyDate(dateStr)}: ${isDone ? "done" : "not done"}`}
              activeOpacity={0.6}
              onPress={() => handleDotPress(dateStr)}
              style={styles.dotTouchWrapper}
            >
              <View
                style={[
                  styles.dot,
                  isDone ? styles.dotFilled : styles.dotEmpty,
                  isToday && styles.dotToday,
                  isSelected && styles.dotSelected,
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>30d ago</Text>
        <Text style={styles.footerText}>Today (last dot)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    paddingTop: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.body,
    color: THEME.bg,
    letterSpacing: 1,
    fontWeight: "bold",
  },
  statusHint: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.body,
    color: THEME.accent,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 6,
  },
  dotTouchWrapper: {
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  dotFilled: {
    backgroundColor: THEME.accent,
  },
  dotEmpty: {
    backgroundColor: THEME.emptyDot,
    borderWidth: 1.5,
    borderColor: THEME.emptyDotBorder,
  },
  dotToday: {
    borderWidth: 2,
    borderColor: THEME.accent,
  },
  dotSelected: {
    transform: [{ scale: 1.25 }],
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  footerText: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.body,
    color: THEME.bg,
  },
});
