import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native-web';
import { colors, spacing, radius } from './theme';
import { loadTodos, saveTodos } from './storage';
import TodoItem from './components/TodoItem';
import FAB from './components/FAB';
import AddTodoBar from './components/AddTodoBar';
import { v4 as uuidv4 } from 'uuid';

/**
 * PUBLIC_INTERFACE
 * Root application component for the React Native Todo app (running via react-native-web).
 * - Header and footer
 * - Scrollable list of todos
 * - Add, edit, toggle, delete functionality
 */
export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (text) => {
    const newItem = { id: uuidv4(), text, completed: false, createdAt: Date.now() };
    setTodos(prev => [newItem, ...prev]);
  };

  const editTodo = (id, newText) => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, text: newText } : t)));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleFabAdd = () => {
    // Simple prompt using window for web environment; on device could be a modal.
    const text = typeof window !== 'undefined' ? window.prompt('New task') : '';
    if (text && text.trim()) addTodo(text.trim());
  };

  const stats = useMemo(() => {
    const total = todos.length;
    const done = todos.filter(t => t.completed).length;
    return { total, done };
  }, [todos]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: spacing.xl,
          paddingVertical: spacing.lg,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: colors.border
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: '800', color: colors.secondary }}>My Todos</Text>
        <Text style={{ marginTop: 2, color: colors.muted }}>
          {stats.done}/{stats.total} completed
        </Text>

        <View style={{ marginTop: spacing.md }}>
          <AddTodoBar onAdd={addTodo} />
        </View>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: spacing.xl, paddingVertical: spacing.lg }}
        style={{ flex: 1, backgroundColor: '#f6f8fb' }}
      >
        {todos.length === 0 ? (
          <View
            style={{
              marginTop: spacing.xl,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: '#fff',
              borderRadius: radius.lg,
              padding: spacing.xl,
              alignItems: 'center'
            }}
          >
            <Text style={{ color: colors.muted }}>No tasks yet. Add your first one!</Text>
          </View>
        ) : (
          todos.map(item => (
            <TodoItem
              key={item.id}
              item={item}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))
        )}
      </ScrollView>

      {/* Footer */}
      <View
        style={{
          paddingHorizontal: spacing.xl,
          paddingVertical: spacing.md,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: colors.border,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Text style={{ color: colors.muted }}>Light • Minimal</Text>
        <Pressable
          onPress={() => {
            const remaining = todos.filter(t => !t.completed).length;
            const msg = `Total: ${todos.length}\nCompleted: ${stats.done}\nRemaining: ${remaining}`;
            if (typeof window !== 'undefined') {
              window.alert(msg);
            }
          }}
          style={({ pressed }) => ({
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.sm,
            borderRadius: radius.md,
            backgroundColor: pressed ? '#fff5db' : colors.accent
          })}
        >
          <Text style={{ color: '#3a2a00', fontWeight: '700' }}>Stats</Text>
        </Pressable>
      </View>

      {/* Floating Action Button */}
      <FAB onPress={handleFabAdd} />
    </SafeAreaView>
  );
}
