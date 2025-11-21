import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useColorScheme } from "nativewind";
import { cn } from "@/lib/utils";

const screenWidth = Dimensions.get("window").width;

interface Props {
  data: { time: string; temp: number; hum: number }[];
}

const Chart = ({ data }: Props) => {
  const { colorScheme } = useColorScheme();

  const dataLenght = data.length;
  const finalDatasets = [
    {
      data: data.map((d) => d.temp),
      color: () => `#93c5fd`,
      strokeWidth: 2,
    },
    {
      data: data.map((d) => d.hum),
      color: () => `#3b82f6`,
      strokeWidth: 2,
    },
  ];
  finalDatasets.push({
    data: [0, ...Array(dataLenght - 2).fill(0), 100],
    color: () => `rgba(0,0,0,0)`,
    strokeWidth: 0,
  });

  const chartData = {
    labels: data.map((d) => `${d.time.split(":").slice(-1).join(":")}s`),
    datasets: finalDatasets,
  };

  const chartConfig = {
    backgroundColor: colorScheme === "dark" ? "#000" : "#f3f4f6",
    backgroundGradientFrom: colorScheme === "dark" ? "transparent" : "#f3f4f6",
    backgroundGradientTo: colorScheme === "dark" ? "transpatrent" : "#f3f4f6",
    decimalPlaces: 0,
    color: () => "transparent",
    labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "transparent",
    },
    style: {
      borderRadius: 16,
      margin: 0,
      padding: 0,
    },
    yAxisInterval: 20,
    yLabelsOffset: 0,
    withVerticalLines: false,
    withVerticalLabels: false,
  };

  if (!data || data.length === 0) {
    return (
      <View className="flex items-center justify-center h-40">
        <Text
          className={cn(
            "text-gray-500",
            colorScheme === "dark" ? "text-gray-400" : "text-gray-600"
          )}
        >
          No data available
        </Text>
      </View>
    );
  }

  return (
    <View className="w-full">
      <Text
        className={cn(
          "text-xl font-semibold capitalize",
          colorScheme === "dark" ? "text-gray-400" : "text-gray-800"
        )}
      >
        Statistics
      </Text>
      <LineChart
        data={chartData}
        width={screenWidth + 26} // from react-native
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
          borderRadius: 16,
          margin: 0,
          marginLeft: -32,
          padding: 0,
          marginVertical: 8,
        }}
      />
      <View className="flex-row justify-center mt-0 pt-2">
        <View className="flex-row items-center mr-6">
          <View className="size-2 bg-blue-300 mr-1 rounded-full" />
          <Text
            className={cn(
              "text-sm",
              colorScheme === "dark" ? "text-gray-400" : "text-gray-800"
            )}
          >
            Temperature
          </Text>
        </View>
        <View className="flex-row items-center">
          <View className="size-2 bg-blue-500 mr-1 rounded-full" />
          <Text
            className={cn(
              "text-sm",
              colorScheme === "dark" ? "text-gray-400" : "text-gray-800"
            )}
          >
            Humidity
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Chart;
