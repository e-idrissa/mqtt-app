import React from "react";
import { View, Text } from "react-native";

// Type pour les données historiques
type HistoricalData = {
  time: string;
  temp: number;
  hum: number;
};

// Constantes pour la mise à l'échelle
const MAX_CHART_VALUE = 100;
const TEMP_SCALING_FACTOR = 2; // Hauteur fixe du graphique en pixels

interface BarProps {
  temp: number;
  hum: number;
  time: string;
}

const Bars = ({ temp, hum, time }: BarProps) => {
  // Calcul de la hauteur de la barre en pourcentage de la hauteur totale du graphique
  // Si la valeur est supérieure à 100 (par ex. 51 * 2 = 102), elle est plafonnée à 100.
  const barHeightPercentage = Math.min(temp, MAX_CHART_VALUE) / MAX_CHART_VALUE;
  const TempBarHeight = barHeightPercentage * temp;
  const HumBarHeight = Math.round(hum);

  return (
    <View className="flex-col items-center justify-between h-36 w-fit ml-2">
      <View className="flex-row items-end justify-center h-[95%] gap-1">
        <View
          style={{
            height: TempBarHeight,
            width: 20,
            backgroundColor: "#93c5fd",
          }}
          className="rounded"
        />
        <View
          style={{
            height: HumBarHeight,
            width: 20,
            backgroundColor: "#3b82f6",
          }}
          className="rounded"
        />
      </View>

      {/* Étiquette de l'heure en bas de la colonne de barres */}
      {time && (
        <Text className="text-xs text-center text-gray-700 mt-1">{time}</Text>
      )}
    </View>
  );
};

const DhtChartCard = ({
  historicalData,
}: {
  historicalData: HistoricalData[];
}) => {
  // Préparation des données : mise à l'échelle de la température
  const chartData = historicalData.map((d) => ({
    ...d,
    // Température x 2 pour une échelle de 0-100
    scaledTemp: d.temp * TEMP_SCALING_FACTOR,
    // Humidité est utilisée directement
    scaledHum: d.hum,
  }));

  return (
    <View className="w-full">
      <Text className="text-lg font-semibold text-gray-500 mb-4">Statistics</Text>
      {/* Zone du graphique (hauteur fixe) */}
      <View className="flex-row items-end justify-around bg-white rounded-lg relative pb-4">
        {chartData.map((data, index) => (
          <View
            key={index}
            className="flex-row items-end justify-center h-full mr-2"
          >
            {/* Barre d'Humidité (Bleu) */}
            <Bars
              temp={data.scaledTemp}
              hum={data.scaledHum}
              time={data.time}
            />
          </View>
        ))}
      </View>

      {/* Légende */}
      <View className="flex-row justify-center mt-0 pt-2">
        <View className="flex-row items-center mr-6">
          <View className="size-2 bg-blue-300 mr-1 rounded-full" />
          <Text className="text-sm">Temperature</Text>
        </View>
        <View className="flex-row items-center">
          <View className="size-2 bg-blue-500 mr-1 rounded-full" />
          <Text className="text-sm">Humidity</Text>
        </View>
      </View>
    </View>
  );
};

export default DhtChartCard;
