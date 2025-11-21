import React from "react";
import { Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import { cn } from "@/lib/utils";

const Footer = () => {
  const { colorScheme } = useColorScheme();

  return (
    <View className={cn("w-full border-t pt-4 mt-8", colorScheme === "dark" ? "border-zinc-700" : "border-gray-200")}>
      <View className="flex flex-row items-center justify-center gap-2 mb-4">
        <View className="size-2 bg-green-500 rounded-full" />
        <Text className={cn("text-center", colorScheme === "dark" ? "text-gray-400" : "text-gray-500")}>
          Connected • Synchronized
        </Text>
      </View>
      <Text className={cn("text-center", colorScheme === "dark" ? "text-gray-400" : "text-gray-500")}>Control Center</Text>
      <Text className={cn("text-gray-500 text-center", colorScheme === "dark" ? "text-gray-400" : "text-gray-500")}>
        Manage your connected devices
      </Text>
    </View>
  );
};

export default Footer;