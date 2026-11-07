import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
      <Text style={styles.text}>Ақбота Нұршат</Text>
      <Text style={styles.text}>Likes: {likes}</Text>
      
      <Pressable onPress={() => setLikes(likes + 1)} style={styles.button}>
        <Text style={styles.buttonText}>Like</Text>
      </Pressable>

      <Link href="/events" asChild>
        <Pressable style={styles.eventsButton}>
          <Text style={styles.buttonText}>Events</Text>
        </Pressable>
      </Link>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 32 },
  button: { minHeight: 44, marginTop: 20, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#007AFF', borderRadius: 8, justifyContent: 'center' },
  eventsButton: { minHeight: 44, marginTop: 15, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#34C759', borderRadius: 8, justifyContent: 'center' },
  buttonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});