/* eslint-disable prettier/prettier */
import {View, Text, TouchableWithoutFeedback, Image} from 'react-native';
import React from 'react';
import * as Icon from 'react-native-feather';
import {themeColors} from '../theme';
import {useNavigation} from '@react-navigation/native';

const RestaurantCard = ({items}) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Restaurant', {...items})}>
      <View
        style={{
          shadowColor: themeColors.bgColor(1),
          shadowRadius: 7,
        }}
        className="mr-6 bg-white rounded-3xl shadow-lg">
        <Image
          className="h-36 w-64 rounded-t-3xl"
          source={{uri: `${items.image}`}}
        />
        <View className="px-3 pb-4 space-y-2">
          <Text className="text-lg font-bold pt-2 text-black">
            {items.name}
          </Text>
          <View className="flex-row items-center space-x-2">
            <Image
              className="h-4 w-4"
              source={require('../assets/Images/Full-star.webp')}
            />
            <Text className="text-xs">
              <Text className="text-green-700">{items.stars}</Text>
              <Text className="text-gray-700">
                ({items.reviews} reviews) .{' '}
                <Text className="font-semibold">{items.category}</Text>
              </Text>
            </Text>
          </View>
          <View className="flex-row items-center space-x-1">
            <Icon.MapPin color="gray" width="15" height="15" />
            <Text className="text-gray-700 text-xs">
              Nearby - {items.address}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RestaurantCard;
