import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import { THEME } from "./src/theme";
import { loadHabits, saveHabits } from "./src/utils/storage";
import { getTodayDateString } from "./src/utils/date";
import HabitCard from "./src/components/HabitCard";
import EmptyState from "./src/components/EmptyState";
import AddHabitModal from "./src/components/AddHabitModal";
import EditHabitModal from "./src/components/EditHabitModal";
import Icon from "./src/components/Icon";
import FloatingNavbar from "./src/components/FloatingNavbar";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Bitcount Prop Single": require("./assets/fonts/BitcountPropSingle-Regular.ttf"),
  });

  const [habits, setHabits] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Modals and tabs state
  const [currentTab, setCurrentTab] = useState("home");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  // Web font link fallback for environments without custom index.html
  useEffect(() => {
    if (Platform.OS === "web" && typeof document !== "undefined") {
      const fontId = "google-font-bitcount";
      if (!document.getElementById(fontId)) {
        const link = document.createElement("link");
        link.id = fontId;
        link.rel = "stylesheet";
        link.href =
          "https://fonts.googleapis.com/css2?family=Bitcount+Prop+Single:wght@100..900&display=swap";
        document.head.appendChild(link);
      }
    }
  }, []);

  // Load habits once on launch
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const stored = await loadHabits();
      if (isMounted) {
        setHabits(stored || []);
        setIsLoaded(true);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // Save habits whenever they change (after initial load)
  useEffect(() => {
    if (isLoaded) {
      saveHabits(habits);
    }
  }, [habits, isLoaded]);

  // Add habit
  const handleAddHabit = useCallback((name) => {
    const newHabit = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      name,
      createdAt: getTodayDateString(),
      archived: false,
      history: {},
    };
    setHabits((prev) => [newHabit, ...prev]);
  }, []);

  // Toggle completion for a specific date (Today or Backfill)
  const handleToggleDate = useCallback((habitId, dateStr) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== habitId) return h;
        const currentVal = Boolean(h.history && h.history[dateStr]);
        return {
          ...h,
          history: {
            ...h.history,
            [dateStr]: !currentVal,
          },
        };
      }),
    );
  }, []);

  // Rename a habit
  const handleRename = useCallback((habitId, newName) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === habitId ? { ...h, name: newName } : h)),
    );
  }, []);

  // Archive / unarchive habit
  const handleToggleArchive = useCallback((habitId) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === habitId ? { ...h, archived: !h.archived } : h)),
    );
  }, []);

  const activeHabits = useMemo(
    () => habits.filter((h) => !h.archived),
    [habits],
  );
  const archivedHabits = useMemo(
    () => habits.filter((h) => h.archived),
    [habits],
  );

  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 13) {
      return "Good Morning!";
    }

    if (currentHour < 18) {
      return "Good Afternoon!";
    }

    return "Good Evening!";
  };

  // Today's friendly header string
  const todayDisplay = useMemo(() => {
    const now = new Date();
    return now
      .toLocaleDateString(undefined, {
        month: "short",
        year: "numeric",
        weekday: "long",
      })
      .toUpperCase();
  }, []);

  const todayDayDisplay = useMemo(() => {
    const now = new Date();
    return now
      .toLocaleDateString(undefined, {
        day: "numeric",
      })
      .toUpperCase();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <StatusBar style="dark" />

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>{getGreeting()}</Text>
            <Text style={styles.todayDate}>{todayDisplay}</Text>
            <Text style={styles.todayDay}>{todayDayDisplay}</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setIsAddOpen(true)}
              activeOpacity={0.8}
            >
              <Icon name="plus" size={20} color={THEME.bg} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content */}
        {!isLoaded || !fontsLoaded ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={THEME.accent} />
            <Text style={styles.loadingText}>INITIALIZING RETRO GRID...</Text>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {currentTab === "home" ? (
              activeHabits.length === 0 ? (
                <EmptyState onAddPress={() => setIsAddOpen(true)} />
              ) : (
                activeHabits.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    onToggleDate={handleToggleDate}
                    onEdit={(h) => setEditingHabit(h)}
                  />
                ))
              )
            ) : (
              <View>
                <View style={styles.tabHeaderSection}>
                  <Text style={styles.tabSectionTitle}>ARCHIVED HABITS</Text>
                  <Text style={styles.tabSectionSubtitle}>
                    {archivedHabits.length} preserved habit
                    {archivedHabits.length !== 1 ? "s" : ""}
                  </Text>
                </View>

                {archivedHabits.length === 0 ? (
                  <View style={styles.emptyArchiveCard}>
                    <Text style={styles.emptyArchiveTitle}>NO ARCHIVED HABITS</Text>
                    <Text style={styles.emptyArchiveText}>
                      When you archive habits instead of deleting them, they will
                      safely appear here with all historical dots intact.
                    </Text>
                  </View>
                ) : (
                  archivedHabits.map((habit) => (
                    <HabitCard
                      key={habit.id}
                      habit={habit}
                      onToggleDate={handleToggleDate}
                      onEdit={(h) => setEditingHabit(h)}
                    />
                  ))
                )}
              </View>
            )}
          </ScrollView>
        )}

        {/* Floating Bottom Navbar */}
        <FloatingNavbar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
        />

        {/* Modals */}
        <AddHabitModal
          visible={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onAdd={handleAddHabit}
        />

        <EditHabitModal
          visible={Boolean(editingHabit)}
          habit={editingHabit}
          onClose={() => setEditingHabit(null)}
          onRename={handleRename}
          onToggleArchive={handleToggleArchive}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.bg,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  greetingText: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.h4,
  },
  todayDate: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.h5,
    color: THEME.text,
    letterSpacing: 1,
    marginTop: 2,
  },
  todayDay: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.h1,
    color: THEME.text,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: THEME.accent,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.body,
    color: THEME.text,
    marginTop: 12,
    letterSpacing: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 110,
  },
  tabHeaderSection: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  tabSectionTitle: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.h4,
    fontWeight: "bold",
    color: THEME.text,
    letterSpacing: 1,
  },
  tabSectionSubtitle: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.body,
    color: THEME.accent,
    marginTop: 4,
  },
  emptyArchiveCard: {
    padding: 24,
    backgroundColor: THEME.bg,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: THEME.cardBorder,
    alignItems: "center",
    marginTop: 20,
  },
  emptyArchiveTitle: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.h5,
    fontWeight: "bold",
    color: THEME.text,
    letterSpacing: 1,
    marginBottom: 8,
  },
  emptyArchiveText: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.body,
    color: THEME.text,
    textAlign: "center",
    lineHeight: 20,
  },
});
