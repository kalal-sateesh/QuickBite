/* eslint-disable prettier/prettier */
import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {themeColors} from '../theme';
import * as Icon from 'react-native-feather';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  removeFromCart,
  selectCartItemsById,
} from '../slices/cartSlice';

const DishRow = ({items}) => {
  const dispatch = useDispatch();

  const totalItems = useSelector(state => selectCartItemsById(state, items.id));

  const handleIncrease = () => {
    dispatch(addToCart({...items}));
  };
  const handleDecrease = () => {
    dispatch(removeFromCart({id: items.id}));
  };
  return (
    <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl shadow-gray-800 mb-3 mx-2">
      <Image
        className="rounded-3xl"
        style={{height: 90, width: 90}}
        source={{uri: `${items.image}`}}
      />
      <View className="flex flex-1 space-y-3">
        <View className="pl-3">
          <Text className="text-xl text-black">{items.name}</Text>
          <Text className="text-gray-700">{items.description}</Text>
        </View>
        <View className="flex-row justify-between pl-3 items-center">
          <Text className="text-gray-700 text-lg font-bold">
            ${items.price}
          </Text>
          <View className="flex-row items-center">
            <TouchableOpacity
              disabled={!totalItems.length}
              onPress={handleDecrease}
              className="p-1 rounded-full"
              style={{
                backgroundColor: themeColors.bgColor(1),
              }}>
              <Icon.Minus
                strokeWidth={2}
                stroke={'white'}
                width={20}
                height={20}
              />
            </TouchableOpacity>
            <Text className="text-black px-2">{totalItems.length}</Text>
            <TouchableOpacity
              onPress={handleIncrease}
              className="p-1 rounded-full"
              style={{
                backgroundColor: themeColors.bgColor(1),
              }}>
              <Icon.Plus
                strokeWidth={2}
                stroke={'white'}
                width={20}
                height={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DishRow;
