import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native-web';
import { colors, spacing, radius } from '../theme';

/**
 * PUBLIC_INTERFACE
 * Renders a single todo item with toggle, edit, and delete actions.
 */
export default function TodoItem({ item, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(item.text);

  const handleSave = () => {
    const trimmed = text.trim();
    if (trimmed.length) {
      onEdit(item.id, trimmed);
    } else {
      setText(item.text);
    }
    setEditing(false);
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: radius.md,
        padding: spacing.md,
        marginVertical: spacing.sm,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md
      }}
      accessibilityRole="summary"
      accessibilityLabel={`Todo ${item.text}`}
    >
      <Pressable
        onPress={() => onToggle(item.id)}
        style={{
          width: 22, height: 22, borderRadius: 11,
          borderWidth: 2, borderColor: item.completed ? colors.primary : colors.border,
          backgroundColor: item.completed ? colors.primary : 'transparent',
          alignItems: 'center', justifyContent: 'center'
        }}
        accessibilityRole="button"
        accessibilityLabel={item.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {item.completed ? (
          <Text style={{ color: '#fff', fontSize: 14 }}>✓</Text>
        ) : null}
      </Pressable>

      <View style={{ flex: 1 }}>
        {editing ? (
          <TextInput
            value={text}
            onChangeText={setText}
            autoFocus
            onSubmitEditing={handleSave}
            onBlur={handleSave}
            style={{
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.sm,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: radius.sm,
              fontSize: 16,
              color: colors.text,
              backgroundColor: '#fff'
            }}
            placeholder="Edit task"
            placeholderTextColor={colors.muted}
          />
        ) : (
          <Text
            style={{
              fontSize: 16,
              color: item.completed ? colors.muted : colors.text,
              textDecorationLine: item.completed ? 'line-through' : 'none'
            }}
          >
            {item.text}
          </Text>
        )}
      </View>

      {!editing && (
        <>
          <Pressable
            onPress={() => setEditing(true)}
            style={({ pressed }) => ({
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.md,
              borderRadius: radius.sm,
              backgroundColor: pressed ? '#eef5ff' : '#f3f7ff',
              borderWidth: 1,
              borderColor: colors.border
            })}
            accessibilityRole="button"
            accessibilityLabel="Edit todo"
          >
            <Text style={{ color: colors.primary, fontWeight: '600' }}>Edit</Text>
          </Pressable>

          <Pressable
            onPress={() => onDelete(item.id)}
            style={({ pressed }) => ({
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.md,
              borderRadius: radius.sm,
              backgroundColor: pressed ? '#fff7f7' : '#fffafa',
              borderWidth: 1,
              borderColor: colors.border,
              marginLeft: spacing.sm
            })}
            accessibilityRole="button"
            accessibilityLabel="Delete todo"
          >
            <Text style={{ color: '#c62828', fontWeight: '600' }}>Delete</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}
