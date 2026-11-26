import { useState, useEffect } from 'react';
import { Pressable, Text, TextInput, View, StyleSheet } from 'react-native';
import { useChat } from '../hooks/useChat';
import { sendMessage } from '../lib/chat';
import { askNotificationPermission } from '../lib/notifications';

export function ChatPanel({ eventId, eventTitle }: { eventId: number; eventTitle: string }) {
  const { messages, status } = useChat(eventId, eventTitle);
  const [text, setText] = useState('');
  const canSend = text.trim().length > 0;

  useEffect(() => {
    askNotificationPermission();
  }, []);

  const onSend = async () => {
    const t = text.trim();
    if (!t) return;
    setText('');
    await sendMessage(eventId, t);
  };

  return (
    <View>
      <Text style={styles.heading}>Live chat</Text>

      <TextInput
        placeholder="Write a message"
        maxLength={200}
        value={text}
        onChangeText={setText}
        style={styles.input}
      />

      <Pressable
        onPress={onSend}
        disabled={!canSend}
        style={[styles.send, !canSend && styles.sendDisabled]}
      >
        <Text>Send</Text>
      </Pressable>

      {status === 'connecting' && <Text>Connecting</Text>}
      {status === 'error' && <Text>Chat unavailable</Text>}
      {status === 'live' && messages.length === 0 && <Text>No messages yet</Text>}

      {[...messages].reverse().map((m) => (
        <Text key={m.id}>
          {m.author}: {m.text}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 18, fontWeight: '600' },
  input: { borderWidth: 1, padding: 8, marginVertical: 8 },
  send: { minHeight: 44, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd' },
  sendDisabled: { opacity: 0.5 },
});