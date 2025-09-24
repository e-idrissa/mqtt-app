import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react";

import { publishMessage } from "@/services/mqtt";

const ControllerLed = () => {
  const [isLedOn, setIsLedOn] = useState(false);

  const handleToggle = (value: boolean) => {
    setIsLedOn(value);
    const payload = value ? "true" : "false";
    publishMessage("idrissa/lights", payload);
  };

  return (
    <View>
      <View className="bg-white rounded-lg flex flex-row h-16 w-full items-center justify-between">
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
