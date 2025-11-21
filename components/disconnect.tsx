import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons'

import { disconnectMqtt, publishMessage } from "@/services/mqtt";

const Disconnect = () => {
  const router = useRouter(); 

  const handleDisconnect = () => {
    publishMessage('idrissa/servo', String(20));
    publishMessage('idrissa/light', "false");
    disconnectMqtt();
    router.push('/'); 
  }
  return (
    <TouchableOpacity onPress={handleDisconnect} className="text-blue-500 py-2 rounded-full">
      <Icon name="link-off" size={20} color="#3b82f6" />
    </TouchableOpacity>
  )
}

export default Disconnect