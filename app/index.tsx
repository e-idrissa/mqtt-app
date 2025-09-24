import { Link } from "expo-router";
import { useState, useEffect } from "react";
import { Image, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";

import { connectMqtt, disconnectMqtt, mqttEvents } from "@/services/mqtt";

export default function Index() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // 1. Define the handler for connection changes
    const handleConnectionChange = (status: boolean) => {
      setIsConnected(status);
    };

    // 2. Subscribe to the connection change event
    mqttEvents.on("connectionChange", handleConnectionChange);

    // 3. Initiate the MQTT connection
    // We don't await connectMqtt() here to avoid blocking the UI thread,
    // as the status update is handled by the event listener (handleConnectionChange).
    connectMqtt();

    // 4. Cleanup function: runs when the component unmounts
    return () => {
      mqttEvents.off("connectionChange", handleConnectionChange);
      disconnectMqtt();
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-between my-10">
      <View className="flex items-center gap-4">
        <View className="mt-16 size-24 rounded-full">
          <Image
            source={require("../assets/icons/home.png")}
            className="h-full w-full rounded-full"
          />
        </View>
        <View className="h-1 w-16 rounded-full bg-gray-300" />
        <View>
          <Text className="text-3xl font-semibold text-center text-gray-700">
            Home Control
          </Text>
          <Text className="text-muted-foreground text-center text-gray-500">
            Modern IoT Home Control App
          </Text>
        </View>
        <View className="flex flex-row gap-2 items-center text-mono rounded bg-white p-2 mt-6">
          <View
            className={`size-2 rounded-full ${
              isConnected ? "bg-green-500" : "bg-gray-300"
            }`}
          />
          <Text className="text-gray-500">
            {isConnected ? "Connected" : "Not Connected"}
          </Text>
        </View>
      </View>
      {isConnected ? (
        <View className="flex flex-row items-center justify-center gap-12 rounded-full bg-white p-2">
          <Text className="ml-2 text-gray-500">Go to Control Center</Text>
          <Link href="/control" className="rounded-full bg-blue-500 p-2">
            <Icon name="arrow-right" size={12} color="#ffffff" />
          </Link>
        </View>
      ) : (
        <View className="flex flex-row items-center justify-center gap-12 rounded-full bg-white p-2">
          <Text className="ml-2 text-gray-500">Go to Control Center</Text>
          <View  className="rounded-full bg-gray-200 p-2">
            <Icon name="loader" size={12} className="animate-spin" />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
