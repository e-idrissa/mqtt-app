import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

import { connectMqtt, disconnectMqtt, mqttEvents } from "@/services/mqtt";
import { cn } from "@/lib/utils";
import Spec from "@/components/spec";

export default function Index() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleConnectionChange = (status: boolean) => {
      setIsConnected(status);
    };

    mqttEvents.on("connectionChange", handleConnectionChange);

    connectMqtt();

    return () => {
      mqttEvents.off("connectionChange", handleConnectionChange);
      disconnectMqtt();
    };
  }, []);

  return (
    <SafeAreaView
      className={cn(
        `flex-1 w-full pb-4`,
        colorScheme === "dark" ? "bg-black" : "bg-gray-100"
      )}
    >
      <View className="relative flex items-start gap-4 w-full h-full">
        <View className="absolute top-10 right-10 flex flex-col rounded-full items-center">
          <Icon name="bulb-outline" size={50} color="#3b82f6" />
          <View className="h-96 w-1 bg-blue-500"/>
        </View>
        <View className="absolute top-1/4 p-8 h-3/4 flex justify-between w-full">
          <View className="">
            <View>
              <Text
                className={cn(
                  `text-4xl font-extrabold`,
                  colorScheme === "dark" ? "text-white" : "text-gray-700"
                )}
              >
                Home Control
              </Text>
              <Text
                className={cn(
                  `text-lg`,
                  colorScheme === "dark" ? "text-white" : "text-gray-700"
                )}
              >
                Modern IoT Home Control App
              </Text>
            </View>
            <View className="flex flex-col gap-6 mt-8">
              <Spec
                icon={"thermometer-outline"}
                title={"Environmental Insights"}
              />
              <Spec icon={"sunny-outline"} title={"Light Control"} />
              <Spec icon={"accessibility-outline"} title={"Motion Detection"} />
            </View>
          </View>
          <TouchableOpacity
            disabled={!isConnected}
            onPress={() => router.push("/control")}
            className={cn(
              "flex flex-row items-center justify-center gap-12 rounded-xl p-4 w-full",
              isConnected ? " bg-blue-500" : " bg-blue-500/70"
            )}
          >
            <Text className="text-white text-xl font-medium">
              {isConnected ? "Control Center" : "Connecting..."}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
