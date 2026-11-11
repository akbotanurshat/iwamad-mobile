import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Pressable, Text, View, StyleSheet } from 'react-native';
import { useEvents } from '../../src/hooks/useEvents';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { data, isPending, isError, error, refetch } = useEvents();

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Could not load events</Text>
        <Text>{error.message}</Text>
        <Pressable onPress={() => refetch()} style={styles.button}>
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const event = data?.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Event not found</Text>
        <Text>No event with id {id}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text>Date: {event.date}</Text>
      <Text>Place: {event.place}</Text>
      <Text>Seats: {event.seats}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  errorTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  button: { marginTop: 16, backgroundColor: '#007AFF', padding: 12, borderRadius: 8, minHeight: 44, justifyContent: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' }
});