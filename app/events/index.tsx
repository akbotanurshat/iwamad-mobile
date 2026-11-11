import { ActivityIndicator, Pressable, Text, View, FlatList, StyleSheet, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import { useEvents } from '../../src/hooks/useEvents';

export default function EventsScreen() {
  const { data, isPending, isError, error, refetch, isRefetching } = useEvents();
  
  const [search, setSearch] = useState('');
  const [savedIds, setSavedIds] = useState<number[]>([]);


  const toggleSave = (id: number) => {
    setSavedIds((prev) => 
      prev.includes(id) ? prev.filter((savedId) => savedId !== id) : [...prev, id]
    );
  };

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

  const filteredData = data?.filter((event) => 
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Long-press an event to save it. Saved: {savedIds.length}</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search events"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        renderItem={({ item }) => {
          const isSaved = savedIds.includes(item.id);
          return (
            <Link href={`/events/${item.id}`} asChild>
              <Pressable 
                style={styles.card}
                onLongPress={() => toggleSave(item.id)}
              >
                <Text style={styles.title}>{item.title}</Text>
                <Text>{item.date} — {item.place}</Text>
                {isSaved && <Text style={styles.savedText}>★ Saved</Text>}
              </Pressable>
            </Link>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  container: { flex: 1, padding: 16 },
  infoText: { textAlign: 'center', marginBottom: 10, color: '#666' },
  searchInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  errorTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  button: { marginTop: 16, backgroundColor: '#007AFF', padding: 12, borderRadius: 8, minHeight: 44, justifyContent: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  card: { padding: 16, borderWidth: 1, marginBottom: 10, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold' },
  savedText: { color: 'orange', fontWeight: 'bold', marginTop: 4 }
});