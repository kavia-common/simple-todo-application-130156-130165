import React, { useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native-web';
import { colors, spacing, radius } from '../theme';

/**
 * PUBLIC_INTERFACE
 * Inline add bar to create new todos quickly.
 */
export default function AddTodoBar({ onAdd }) {
  const [value, setValue] = useState('');

  const submit = () => {
    const trimmed = value.trim();
    if (trimmed.length) {
      onAdd(trimmed);
      setValue('');
    }
  };

  return (
    <View style={{ flexDirection: 'row', gap: spacing.sm }}>
      <TextInput
        value={value}
        onChangeText={setValue}
        onSubmitEditing={submit}
        placeholder="Add a new task"
        placeholderTextColor={colors.muted}
        style={{
          flex: 1,
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius.md,
          backgroundColor: '#fff',
          fontSize: 16,
          color: colors.text
        }}
      />
      <Pressable
        onPress={submit}
        style={({ pressed }) => ({
          paddingHorizontal: spacing.lg,
          borderRadius: radius.md,
          backgroundColor: pressed ? '#1667b4' : colors.primary,
          alignItems: 'center',
          justifyContent: 'center'
        })}
        accessibilityRole="button"
        accessibilityLabel="Add task"
      >
        <Text style={{ color: '#fff', fontWeight: '700' }}>Add</Text>
      </Pressable>
    </View>
  );
}
