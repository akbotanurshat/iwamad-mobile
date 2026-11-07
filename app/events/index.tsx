import { FlatList, Text, View, StyleSheet, TextInput } from 'react-native';
import EventRow from '../../src/components/EventRow';
import { events } from '../../src/data/events';
import { router } from 'expo-router';
import { useState } from 'react';

export default function EventsScreen() {
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSave = (id: number) => {
    setSavedIds((ids) => 
      ids.includes(id) 
        ? ids.filter((x) => x !== id) 
        : [...ids, id]                
    );
  };

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Long-press an event to save it. Saved: {savedIds.length}
      </Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search events"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(e) => String(e.id)}
        ListEmptyComponent={<Text style={styles.emptyText}>No events match</Text>}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            saved={savedIds.includes(item.id)} 
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSave(item.id)} 
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerText: { padding: 15, fontSize: 16, backgroundColor: '#f0f0f0', textAlign: 'center' },
  searchInput: { padding: 10, margin: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, fontSize: 16 },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: 'gray' },
});