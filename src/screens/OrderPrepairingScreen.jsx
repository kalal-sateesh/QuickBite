/* eslint-disable prettier/prettier */
import {View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const OrderPrepairingScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery');
    }, 3000);
  }, [navigation]);
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Image
        source={require('../assets/Images/delivery.jpg')}
        className="w-80 h-80"
      />
    </View>
  );
};

export default OrderPrepairingScreen;
