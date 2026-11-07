import { useLocalSearchParams, Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { events } from '../../src/data/events';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // Тізімнен ID-і сәйкес келетін event-ті іздеу
  const event = events.find((e) => e.id === Number(id));

  // Егер ондай event табылмаса
  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>Event not found</Text>
        <Text style={styles.errorText}>No event with id {id}.</Text>
      </View>
    );
  }

  // Егер event табылса
  return (
    <View style={styles.container}>
      {/* Жоғарғы Header-ге event-тің атын шығару */}
      <Stack.Screen options={{ title: event.title }} />
      
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.info}>Күні: {event.date}</Text>
      <Text style={styles.info}>Орны: {event.place}</Text>
      <Text style={styles.info}>Бос орындар: {event.seats}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  info: { fontSize: 18, marginBottom: 10 },
  errorTitle: { fontSize: 22, fontWeight: 'bold', color: 'red', marginBottom: 10 },
  errorText: { fontSize: 16 },
});