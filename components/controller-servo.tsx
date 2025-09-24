import { useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Slider from "@react-native-community/slider";

import { publishMessage } from '@/services/mqtt';

const ControllerServo = () => {
  const [position, setPosition] = useState(0);

  const handleSlidingComplete = (value: number) => {
    const roundedValue = Math.round(value);
    setPosition(roundedValue);
    publishMessage('idrissa/servo', String(roundedValue));
  };

  return (
    <View className="flex-1">
      <View className="bg-white rounded-lg flex flex-row h-16 w-full items-center justify-between">
        <View className={`rounded-lg size-16 flex items-center justify-center`}>
          <Icon name="timer-outline" size={24} />
        </View>
        <View className="flex-1 mr-4">
          <Slider
            minimumValue={20}
            maximumValue={180}
            step={1}
            value={position}
            onValueChange={handleSlidingComplete}
            minimumTrackTintColor="#007aff"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#007aff"
          />
        </View>
      </View>
    </View>
  );
};

export default ControllerServo;
