import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBX-7C8zYrofRMvjGgMjWpa0tPXBHo7oc4",
  authDomain: "iwamad-chat-3ef7e.firebaseapp.com",
  databaseURL: "https://iwamad-chat-3ef7e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "iwamad-chat-3ef7e",
  storageBucket: "iwamad-chat-3ef7e.firebasestorage.app",
  messagingSenderId: "1055232995899",
  appId: "1:1055232995899:web:bff08e39d0809593e1a21e"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);