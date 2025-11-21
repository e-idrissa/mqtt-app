import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import Icon from "react-native-vector-icons/Ionicons";

import { publishMessage } from "@/services/mqtt";
import { cn } from "@/lib/utils";

const ControllerLed = () => {
  const { colorScheme } = useColorScheme();
  const [isLedOn, setIsLedOn] = useState(false);

  const handleToggle = (value: boolean) => {
    setIsLedOn(value);
    const payload = value ? "true" : "false";
    publishMessage("idrissa/light", payload);
  };

  return (
    <View>
      <View className={cn("rounded-lg flex flex-row h-16 w-full items-center justify-between", colorScheme === "dark" ? "bg-zinc-500" : "bg-white")}>
        <TouchableOpacity onPress={handleToggle.bind(null, !isLedOn)}>
          <View
            className={`rounded-lg size-16 flex items-center justify-center`}
          >
            {isLedOn ? (
              <Icon name="bulb" size={24} color="#d97706" />
            ) : (
              <Icon name="bulb-outline" size={24} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ControllerLed;
