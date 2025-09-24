import { Text, View } from "react-native";
import React from "react";

const Footer = () => {
  return (
    <View className="w-full border-t border-gray-300 pt-2">
      <View className="flex flex-row items-center justify-center gap-2 mb-4">
        <View className="size-2 bg-green-500 rounded-full" />
        <Text className="text-center text-gray-500">
          Connected • Synchronized
        </Text>
      </View>
      <Text className="text-center text-gray-500">Control Center</Text>
      <Text className="text-gray-500 text-center">
        Manage your connected devices
      </Text>
    </View>
  );
};

export default Footer;