import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  event: { id: number; title: string; date: string; place: string };
  onPress: () => void;
  onLongPress: () => void;
  saved?: boolean; // Жаңадан қосылды: сақталған ба, жоқ па?
};

export default function EventRow({ event, onPress, onLongPress, saved }: Props) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.subtitle}>{event.date} — {event.place}</Text>
      {/* Егер сақталған болса, ★ Saved деп шығарады */}
      {saved && <Text style={styles.savedText}>★ Saved</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc', minHeight: 44 },
  cardPressed: { backgroundColor: '#e0e0e0' }, // Басып тұрғандағы түс
  title: { fontSize: 16, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: 'gray' },
  savedText: { color: 'orange', fontWeight: 'bold', marginTop: 5 },
});