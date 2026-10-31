import React, { useState } from "react";
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

export default function AddHabitModal({ visible, onClose, onAdd }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setName("");
    onClose();
  };

  const handleCancel = () => {
    setName("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.overlay}
      >
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>+ NEW HABIT</Text>
          <Text style={styles.modalSubtitle}>Name only. Keep it simple.</Text>

          <TextInput
            style={styles.input}
            placeholder="e.g. Morning stretch"
            placeholderTextColor={THEME.text}
            value={name}
            onChangeText={setName}
            autoFocus
            onSubmitEditing={handleSubmit}
            returnKeyType="done"
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelText}>CANCEL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.submitButton,
                !name.trim() && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={!name.trim()}
            >
              <Text style={styles.submitText}>ADD HABIT</Text>
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
    maxWidth: 400,
    backgroundColor: THEME.cardBg,
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.h5,
    fontWeight: "bold",
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
  input: {
    fontFamily: THEME.fontFamily,
    fontSize: THEME.type.body,
    color: THEME.text,
    backgroundColor: THEME.bg,
    borderWidth: 1.5,
    borderColor: THEME.cardBorder,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
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
    fontWeight: "bold",
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
    fontWeight: "bold",
    color: THEME.bg,
  },
});
