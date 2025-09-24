import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "@/components/footer";
import Insight from "@/components/insight";
import Disconnect from "@/components/disconnect";
import DhtChartCard from "@/components/chart";
import ControllerLed from "@/components/controller-led";
import ControllerServo from "@/components/controller-servo";

import { mqttEvents } from "@/services/mqtt";

const Control = () => {
  const initialHistoricalData = [
    { time: "1h", temp: 28.9, hum: 60.2 },
    { time: "2h", temp: 27.8, hum: 55.0 },
    { time: "3h", temp: 25.1, hum: 50.7 },
    { time: "4h", temp: 22.5, hum: 45.3 },
    { time: "5h", temp: 20.0, hum: 60.0 },
  ];

  const [tempData, setTempData] = useState<number | null>(null);
  const [humData, setHumData] = useState<number | null>(null);

  useEffect(() => {
    const handleMessage = (topic: string, payload: string) => {
      if (topic === "idrissa/Tempdata") {
        const [temp, hum] = payload.split(",").map(Number);
        setTempData(temp);
        setHumData(hum);
      }
    };

    mqttEvents.on("messageReceived", handleMessage);

    return () => {
      mqttEvents.off("messageReceived", handleMessage);
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-center w-full">
      <View className="flex-1 items-center justify-between pt-8 px-8 w-full">
        <View className="w-full flex-1 items-center gap-10">
          <View className="flex flex-row items-center justify-between w-full">
            <Text className="text-gray-700 text-4xl font-extrabold">
              Control Center
            </Text>
            <Disconnect />
          </View>
          {/* Environment */}
          <View className="bg-white/40 border border-white p-4 rounded-lg w-full gap-4">
            <Text className="text-lg font-semibold text-gray-500">
              Environmental Sensors
            </Text>
            <View className="flex flex-row items-center justify-between gap-4">
              <Insight type={"temperature"} value={tempData} />
              <Insight type={"humidity"} value={humData} />
            </View>
          </View>
          {/* Sensors */}
          <View className="gap-4 w-full">
            <Text className="text-2xl font-bold text-gray-700">Controls</Text>
            <View className="flex items-center justify-between gap-4 w-full bg-white/30 border border-white rounded-lg p-4">
              <View className="flex flex-row items-center justify-between w-full gap-2">
                <ControllerLed />
                <ControllerServo />
              </View>
              <DhtChartCard historicalData={initialHistoricalData} />
            </View>
          </View>
        </View>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

export default Control;
