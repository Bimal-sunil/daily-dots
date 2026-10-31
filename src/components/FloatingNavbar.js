import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Home01Icon from '@hugeicons/core-free-icons/Home01Icon';
import Archive02Icon from '@hugeicons/core-free-icons/Archive02Icon';
import HugeIcon from './HugeIcon';
import { THEME } from '../theme';

export default function FloatingNavbar({ currentTab = 'home', onSelectTab }) {
  const tabs = [
    { key: 'home', icon: Home01Icon, label: 'Home' },
    { key: 'archive', icon: Archive02Icon, label: 'Archive' },
  ];

  return (
    <View style={styles.outerContainer} pointerEvents="box-none">
      <View style={styles.pillContainer}>
        {tabs.map((tab) => {
          const isActive = currentTab === tab.key;

          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
              onPress={() => onSelectTab(tab.key)}
              activeOpacity={0.8}
              accessibilityLabel={tab.label}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <HugeIcon
                icon={tab.icon}
                size={24}
                color={isActive ? THEME.text : THEME.bg}
                strokeWidth={2}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 22,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  pillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.text, // #202020 dark background
    borderRadius: 36,
    height: 62,
    paddingHorizontal: 12,
    gap: 16,
    // Soft floating shadow
    ...Platform.select({
      web: {
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.25)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
      },
    }),
  },
  tabButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabButton: {
    backgroundColor: THEME.accent, // #EE6C4D orange circle
  },
});

