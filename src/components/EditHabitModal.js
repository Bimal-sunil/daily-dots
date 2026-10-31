import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { THEME } from "../theme";

export default function EditHabitModal({
  visible,
  habit,
  onClose,
  onRename,
  onToggleArchive,
}) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (habit) {
      setName(habit.name || "");
    }
  }, [habit]);

  if (!habit) return null;

  const handleSaveRename = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onRename(habit.id, trimmed);
    onClose();
  };

  const handleToggleArchive = () => {
    onToggleArchive(habit.id);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.overlay}
      >
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>EDIT HABIT</Text>
          <Text style={styles.modalSubtitle}>
            Rename or archive this habit.
          </Text>

          <Text style={styles.fieldLabel}>HABIT NAME</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Habit name"
            placeholderTextColor={THEME.text}
            onSubmitEditing={handleSaveRename}
            returnKeyType="done"
          />

          <View style={styles.archiveSection}>
            <View style={styles.archiveInfo}>
              <Text style={styles.archiveTitle}>
                {habit.archived ? "UNARCHIVE HABIT" : "ARCHIVE HABIT"}
              </Text>
              <Text style={styles.archiveDesc}>
                {habit.archived
                  ? "Restore this habit to your Today screen."
                  : "Hide from Today screen while preserving all dot history."}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.archiveButton]}
              onPress={handleToggleArchive}
            >
              <Text
                style={[
                  styles.archiveButtonText,
                  habit.archived && styles.unarchiveButtonText,
                ]}
              >
                {habit.archived ? "RESTORE" : "ARCHIVE"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>CANCEL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.submitButton,
                (!name.trim() || name.trim() === habit.name) &&
                  styles.disabledButton,
              ]}
              onPress={handleSaveRename}
              disabled={!name.trim() || name.trim() === habit.name}
            >
              <Text style={styles.submitText}>SAVE NAME</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(32, 32, 32, 0.65)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: THEME.cardBg,
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.h5,
    color: THEME.bg,
    letterSpacing: 1,
  },
  modalSubtitle: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.body,
    color: THEME.bg,
    marginTop: 4,
    marginBottom: 16,
  },
  fieldLabel: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.body,
    color: THEME.bg,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  input: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.body,
    color: THEME.text,
    backgroundColor: THEME.bg,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  archiveSection: {
    padding: 14,
    borderRadius: 6,
    backgroundColor: THEME.text,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: THEME.bg,
  },
  archiveInfo: {
    marginBottom: 10,
  },
  archiveTitle: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.body,
    fontWeight: "bold",
    color: THEME.bg,
    letterSpacing: 0.5,
  },
  archiveDesc: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.body,
    color: THEME.bg,
    marginTop: 4,
    lineHeight: 18,
  },
  archiveButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: THEME.accent,
  },
  archiveButtonText: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.body,
    color: THEME.bg,
  },
  unarchiveButtonText: {
    color: THEME.bg,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  cancelButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: THEME.bg,
  },
  cancelText: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.body,
    color: THEME.text,
  },
  submitButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: THEME.accent,
  },
  disabledButton: {
    opacity: 0.4,
  },
  submitText: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.body,
    color: THEME.bg,
  },
});
