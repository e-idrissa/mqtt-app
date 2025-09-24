import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";

type Props = {
  type: "temperature" | "humidity";
  value: number | null;
};

const Insight = ({ type, value }: Props) => {
  return (
    <View className="bg-white p-2 rounded-lg flex-1 h-24 gap-2">
      <View className="flex flex-row items-center gap-2">
        {type === "temperature" ? (
          <Icon name="thermometer-outline" size={24} color="#f97316" />
        ) : (
          <Icon name="water-outline" size={24} color="#2563eb" />
        )}
        <Text className="text-base text-gray-500 font-semibold capitalize">
          {type}
        </Text>
      </View>
      <View className="ml-8 flex flex-row items-start gap-1">
        <Text className="text-5xl font-semibold text-gray-500">{value}</Text>
        <Text className="text-base font-medium text-gray-500">
          {type === "temperature" ? "°C" : "%"}
        </Text>
      </View>
    </View>
  );
};

export default Insight;
