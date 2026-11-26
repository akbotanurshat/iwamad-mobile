import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import type { ChatMessage } from './chat';

const supported = Platform.OS !== 'web';

if (supported) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

export async function askNotificationPermission(): Promise<void> {
  if (!supported) return;
  const { status } = await Notifications.requestPermissionsAsync();
  console.log("Notification permission status:", status); // Рұқсат берілді ме, тексеру үшін
}

export async function notifyNewMessage(eventTitle: string, message: ChatMessage): Promise<void> {
  if (!supported) return;
  console.log("Notification function called!", eventTitle, message.text); // Функция шақырылып жатыр ма, тексеру үшін
  
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `New message: ${eventTitle}`,
      body: `${message.author}: ${message.text}`,
    },
    trigger: null,
  });
}