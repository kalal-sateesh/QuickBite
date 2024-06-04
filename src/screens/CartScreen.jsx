/* eslint-disable prettier/prettier */
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeColors} from '../theme';
import * as Icon from 'react-native-feather';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {selectRestaurant} from '../slices/restaurantSlice';
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from '../slices/cartSlice';

const CartScreen = () => {
  const restaurant = useSelector(selectRestaurant);
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [groupedItems, setGroupedItems] = useState({});

  const dispatch = useDispatch();
  const deliveryFee = 2;

  useEffect(() => {
    const items = cartItems.reduce((group, item) => {
      if (group[item.id]) {
        group[item.id].push(item);
      } else {
        group[item.id] = [item];
      }
      return group;
    }, {});
    setGroupedItems(items);
  }, [cartItems]);

  return (
    <View className="bg-white flex-1">
      {/* back button */}
      <View className="relative py-4 shadow-sm shadow-gray-700">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{backgroundColor: themeColors.bgColor(1)}}
          className="absolute z-10 rounded-full p-1 shadow top-5 left-2">
          <Icon.ArrowLeft strokeWidth={3} stroke="white" />
        </TouchableOpacity>
        <View>
          <Text className="text-center font-bold text-xl text-black">
            Your Cart
          </Text>
          <Text className="text-center text-gray-500">{restaurant.name}</Text>
        </View>
      </View>
      {/* delevery time */}
      <View
        style={{backgroundColor: themeColors.bgColor(0.2)}}
        className="flex-row px-4 items-center">
        <Image
          source={require('../assets/Images/deleveryGuy1.jpg')}
          className="w-20 h-20 rounded-full"
        />
        <Text className="flex-1 pl-4 text-black">Deliver in 20-30 minutes</Text>
        <TouchableOpacity>
          <Text className="font-bold" style={{color: themeColors.text}}>
            Change
          </Text>
        </TouchableOpacity>
      </View>
      {/* dishes */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className="bg-white pt-5">
        {Object.entries(groupedItems).map(([key, items]) => {
          let dish = items[0];
          return (
            <View
              key={key}
              className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mb-3 mx-2 shadow-md shadow-gray-950">
              <Text className="font-bold" style={{color: themeColors.text}}>
                {items.length} x
              </Text>
              <Image
                className="h-14 w-14 rounded-full"
                source={{uri: `${dish.image}`}}
              />
              <Text className="flex-1 font-bold text-gray-400">
                {dish.name}
              </Text>
              <Text className="font-semibold text-base">${dish.price}</Text>
              <TouchableOpacity
                onPress={() => dispatch(removeFromCart({id: dish.id}))}
                className="p-1 rounded-full"
                style={{backgroundColor: themeColors.bgColor(1)}}>
                <Icon.Minus
                  strokeWidth={2}
                  height={20}
                  width={20}
                  stroke={'white'}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      {/* totals */}
      <View
        className="p-6 px-8 rounded-t-3xl space-y-4"
        style={{backgroundColor: themeColors.bgColor(0.2)}}>
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Subtotal</Text>
          <Text className="text-gray-700">${cartTotal}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Delivery fee</Text>
          <Text className="text-gray-700">${deliveryFee}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700 font-extrabold">Order Total</Text>
          <Text className="text-gray-700 font-extrabold">
            ${cartTotal + deliveryFee}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('OrderPrepairing')}
            className="p-3 rounded-full"
            style={{
              backgroundColor: themeColors.bgColor(1),
            }}>
            <Text className="text-white text-center font-bold text-lg">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;
