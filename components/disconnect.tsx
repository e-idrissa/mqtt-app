import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons'

import { disconnectMqtt, publishMessage } from "@/services/mqtt";

const Disconnect = () => {
  const router = useRouter(); 

  const handleDisconnect = () => {
    publishMessage('idrissa/servo', String(20));
    publishMessage('idrissa/lights', "false");
    disconnectMqtt();
    router.push('/'); 
  }
  return (
    <TouchableOpacity onPress={handleDisconnect} className="border-2 border-blue-500 p-1 rounded-full">
      <Icon name="link-off" size={20} color="#2563eb" />
    </TouchableOpacity>
  )
}

export default Disconnect