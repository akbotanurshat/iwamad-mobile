import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchEvents } from '../../src/lib/api';
import type { CampusEvent } from '../../src/data/events';

export default function EventsScreen() {
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <View style={styles.container}>
      {/* Қателік шықса, жоғарыда көрсетеміз */}
      {error && <Text style={styles.error}>Қате: {error}</Text>}

      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.date} | {item.place}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  error: { color: 'red', marginBottom: 10 },
  card: { padding: 16, borderWidth: 1, marginBottom: 10, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold' }
});