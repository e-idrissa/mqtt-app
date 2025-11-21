import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import { cn } from "@/lib/utils";
import { useColorScheme } from "nativewind";

type Props = {
  type: string;
  value: number | null;
};

const Insight = ({ type, value }: Props) => {
  const { colorScheme } = useColorScheme();

  return (
    <View
      className={cn(
        "border p-2 rounded-lg w-[48%] h-18 gap-2 mb-4",
        colorScheme === "dark" ? "bg-zinc-900 border-zinc-700" : "bg-zinc-200/30 border-zinc-200"
      )}
    >
      <View className="flex flex-row items-center gap-2">
        {type === "temperature" ? (
          <Icon name="thermometer-outline" size={20} color="#f97316" />
        ) : type === "humidity" ? (
          <Icon name="water-outline" size={20} color="#2563eb" />
        ) : type === "brightness" ? (
          <Icon name="sunny-outline" size={20} color="#f59e0b" />
        ) : (
          <Icon name="walk-outline" size={20} color="#4ade80" />
        )}
        <Text className={cn("font-semibold capitalize", colorScheme === "dark" ? "text-gray-400" : "text-gray-800")}>{type}</Text>
      </View>
      <View className="ml-8 flex flex-row items-start gap-1">
        <Text className={cn("text-4xl font-bold", colorScheme === "dark" ? "text-gray-400" : "text-gray-800")}>{value}</Text>
        <Text className={cn("text-lg font-medium", colorScheme === "dark" ? "text-gray-400" : "text-gray-800")}>
          {type === "temperature"
            ? "°C"
            : type === "humidity"
              ? "%"
              : type === "brightness"
                ? "lux"
                : "cm"}
        </Text>
      </View>
    </View>
  );
};

export default Insight;
