import { Text, View, ScrollView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";

import Footer from "@/components/footer";
import Insight from "@/components/insight";
import Disconnect from "@/components/disconnect";
import ControllerLed from "@/components/controller-led";
import ControllerServo from "@/components/controller-servo";
import Chart from "@/components/line-chart";

import { mqttEvents } from "@/services/mqtt";
import { cn } from "@/lib/utils";

const screenWidth = Dimensions.get("window").width;

const Control = () => {
  const { colorScheme } = useColorScheme();
  const [historicalData, setHistoricalData] = useState([
    { time: "1h", temp: 36.2, hum: 62.1 },
    { time: "2h", temp: 26.5, hum: 58.3 },
    { time: "3h", temp: 32.0, hum: 55.7 },
    { time: "4h", temp: 39.8, hum: 43.2 },
    { time: "5h", temp: 37.6, hum: 50.0 },
    { time: "6h", temp: 38.9, hum: 57.5 },
    { time: "7h", temp: 41.3, hum: 49.8 },
    { time: "8h", temp: 36.7, hum: 61.2 },
    { time: "9h", temp: 40.1, hum: 56.4 },
    { time: "10h", temp: 42.5, hum: 54.9 },
  ]);

  // 1️⃣ Mise à jour des états pour chaque type de donnée
  const [tempData, setTempData] = useState<number | null>(null);
  const [humData, setHumData] = useState<number | null>(null);
  const [ldrData, setLdrData] = useState<number | null>(null);
  const [motionData, setMotionData] = useState<number | null>(null);

  useEffect(() => {
    // 2️⃣ Création de gestionnaires d'événements dédiés
    const handleTempData = (payload: string) => {
      const [temp, hum] = payload.split(",").map(Number);
      setTempData(temp);
      setHumData(hum);

      const currentTime = new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // Force le format 24 heures (ex: 15:30:45)
      });

      // 2. Mettre à jour les données historiques avec la nouvelle lecture
      setHistoricalData((prevData) => {
        const newDataPoint = {
          time: currentTime,
          temp: temp,
          hum: hum,
        };
        // Conserver uniquement les 10 dernières lectures pour le graphique
        const updatedData = [...prevData, newDataPoint].slice(-10);
        return updatedData;
      });
    };

    const handleLdrData = (payload: string) => {
      setLdrData(Number(payload));
    };

    const handleMotionData = (payload: string) => {
      setMotionData(Number(payload));
    };

    // 3️⃣ Abonnement aux événements MQTT spécifiques
    mqttEvents.on("tempData", handleTempData);
    mqttEvents.on("ldrData", handleLdrData);
    mqttEvents.on("motionData", handleMotionData);

    // Nettoyage des listeners lors du démontage du composant
    return () => {
      mqttEvents.off("tempData", handleTempData);
      mqttEvents.off("ldrData", handleLdrData);
      mqttEvents.off("motionData", handleMotionData);
    };
  }, []);

  // 4️⃣ Utilisation des données d'état dynamiques
  const data = [
    { type: "temperature", value: tempData },
    { type: "humidity", value: humData },
    { type: "motion", value: motionData },
    { type: "brightness", value: ldrData },
  ];

  return (
    <SafeAreaView
      className={cn(
        "flex-1 items-center justify-center w-full",
        colorScheme === "dark" ? "bg-black" : "bg-gray-100"
      )}
    >
      <ScrollView
        className="p-4 py-8"
        showsVerticalScrollIndicator={false}
        style={{ width: screenWidth }}
      >
        <View className="w-full flex-1 items-center gap-4">
          <View className="flex flex-row items-center justify-between w-full">
            <Text
              className={cn(
                "text-4xl font-extrabold",
                colorScheme === "dark" ? "text-white" : "text-gray-900"
              )}
            >
              Control Center
            </Text>
            <Disconnect />
          </View>
          {/* Environment */}
          <View className="w-full gap-4">
            <View className="flex-row flex-wrap justify-between">
              {data.map((d) => (
                <Insight key={d.type} type={d.type} value={d.value} />
              ))}
            </View>
          </View>
          <Chart data={historicalData} />
          {/* Sensors */}
          <View className="gap-4 w-full">
            <Text
              className={cn(
                "text-2xl font-bold capitalize",
                colorScheme === "dark" ? "text-gray-400" : "text-gray-800"
              )}
            >
              Controls
            </Text>
            <View
              className={cn(
                "flex items-center justify-between gap-4 w-full border rounded-lg p-4",
                colorScheme === "dark"
                  ? "bg-zinc-900 border-zinc-700"
                  : "bg-zinc-200/30 border-zinc-200"
              )}
            >
              <View className="flex flex-row items-center justify-between w-full gap-2">
                <ControllerLed />
                <ControllerServo />
              </View>
            </View>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Control;
