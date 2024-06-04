/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as Icon from 'react-native-feather';
import {themeColors} from '../theme';
import DishRow from '../components/DishRow';
import CartIcon from '../components/CartIcon';
import {useDispatch} from 'react-redux';
import {setRestaurant} from '../slices/restaurantSlice';

const RestaurantScreen = () => {
  const {params} = useRoute();
  const items = params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (items && items.id) {
      dispatch(setRestaurant({...items}));
    }
  }, [items, dispatch]);
  return (
    <View>
      <CartIcon />
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <View className="relative">
          <Image className="w-full h-72" source={{uri: `${items.image}`}} />
          <TouchableOpacity
            className="absolute top-6 left-4 bg-gray-50 p-2 rounded-full shodow"
            onPress={() => navigation.goBack()}>
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
          </TouchableOpacity>
        </View>
        <View
          style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}}
          className="bg-white -mt-12 pt-6">
          <View className="px-5">
            <Text className="text-3xl font-bold text-black">{items.name}</Text>
            <View className="flex-row space-x-2 my-2">
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
            <Text className="text-gray-500 mt-2">{items.description}</Text>
          </View>
        </View>
        <View className="pb-36 bg-white">
          <Text className="px-4 py-4 text-2xl font-bold text-black">Menu</Text>
          {/* dishes */}
          {items.dishes.map((dish, index) => (
            <DishRow items={{...dish}} key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default RestaurantScreen;
