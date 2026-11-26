import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { FadeIn, FadeOut, LinearTransition, ZoomIn } from 'react-native-reanimated';

type Props = {
  event: { id: number; title: string; date: string; place: string };
  onPress: () => void;
  onToggleSaved: () => void;
  saved?: boolean;
};

export default function EventRow({ event, onPress, onToggleSaved, saved }: Props) {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition}>
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>{saved ? 'Unsave' : 'Save'}</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.subtitle}>{event.date} — {event.place}</Text>
          
          {saved && (
            <Animated.Text entering={ZoomIn} style={styles.savedText}>
              ★ Saved
            </Animated.Text>
          )}
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc', minHeight: 44, backgroundColor: 'white' },
  cardPressed: { backgroundColor: '#e0e0e0' },
  title: { fontSize: 16, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: 'gray' },
  savedText: { color: 'orange', fontWeight: 'bold', marginTop: 5 },
  action: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 44,
    width: 80,
    backgroundColor: '#007AFF',
  },
  actionText: { color: 'white', fontWeight: 'bold' },
});