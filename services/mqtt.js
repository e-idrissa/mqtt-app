import { Client, Message } from 'react-native-paho-mqtt';
import EventEmitter from 'events';

// Use a WebSocket URI for the Expo environment
const URI = 'ws://broker.hivemq.com:8000/mqtt'; 
const CLIENT_ID = `expo_client_${Math.random().toString(16).substr(2, 8)}`;

const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item;
  },
  getItem: (key) => myStorage[key],
  removeItem: (key) => {
    delete myStorage[key];
  },
};

const client = new Client({
  uri: URI,
  clientId: CLIENT_ID,
  storage: myStorage,
});

// Create an event emitter to broadcast incoming messages
export const mqttEvents = new EventEmitter();

client.on('connectionLost', (response) => {
  console.log('❌ Connection lost:', response.errorMessage);
  mqttEvents.emit('connectionChange', false);
});

client.on('messageReceived', (message) => {
  // console.log('📩 Message received on topic:', message.destinationName);
  mqttEvents.emit('messageReceived', message.destinationName, message.payloadString);
});

export const connectMqtt = async () => {
  try {
    await client.connect();
    console.log('✅ Connected to MQTT broker!');
    mqttEvents.emit('connectionChange', true);
    await client.subscribe('idrissa/Tempdata');
    console.log('✅ Subscribed to topic: idrissa/Tempdata');
    return true;
  } catch (error) {
    console.error('❌ MQTT connection failed:', error);
    mqttEvents.emit('connectionChange', false);
    return false;
  }
};

export const disconnectMqtt = () => {
  if (client.isConnected()) {
    client.disconnect();
    mqttEvents.emit('connectionChange', false);
    console.log('🔴 Disconnected from MQTT broker.');
  }
};

export const publishMessage = async (topic, payload) => {
  if (!client.isConnected()) {
    console.warn('⚠️ Not connected to MQTT broker. Cannot publish.');
    return;
  }
  const message = new Message(payload);
  message.destinationName = topic;
  try {
    await client.send(message);
    console.log(`📤 Published to ${topic}: ${payload}`);
  } catch (error) {
    console.error(`❌ Failed to publish to ${topic}:`, error);
  }
};

export const getMqttClient = () => client;