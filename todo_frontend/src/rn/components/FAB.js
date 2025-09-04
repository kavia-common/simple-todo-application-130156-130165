import React from 'react';
import { Pressable, Text } from 'react-native-web';
import { colors, radius, spacing } from '../theme';

/**
 * PUBLIC_INTERFACE
 * Floating action button component.
 */
export default function FAB({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        position: 'absolute',
        right: spacing.xl,
        bottom: spacing.xl,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: pressed ? '#1667b4' : colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 }
      })}
      accessibilityRole="button"
      accessibilityLabel="Add new todo"
    >
      <Text style={{ color: '#fff', fontSize: 26, marginTop: -2 }}>＋</Text>
    </Pressable>
  );
}
