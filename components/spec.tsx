import React from "react";
import { View, Text } from "react-native";
import { useColorScheme } from "nativewind";
import Icon from "react-native-vector-icons/Ionicons";
import { cn } from "@/lib/utils";

interface Props {
  icon: string;
  title: string;
}

const Spec = ({ icon, title }: Props) => {
  const { colorScheme } = useColorScheme();
  
  return (
    <View className="flex flex-row items-center gap-4 rounded-full">
      <View className="rounded-full">
        <Icon name={icon} size={20} color="#3b82f6" />
      </View>
      <Text className={cn("text-xl", colorScheme === "dark" ? "text-white" : "text-gray-500")}>{title}</Text>
    </View>
  );
};

export default Spec;
