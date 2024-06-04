/* eslint-disable prettier/prettier */
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {themeColors} from '../theme';
import RestaurantCard from './RestaurantCard';

const FeaturedRow = ({title, description, restaurants}) => {
  return (
    <View>
      <View className="flex-row justify-between items-center px-4">
        <View>
          <Text className="font-bold text-lg text-black">{title}</Text>
          <Text className="text-sm text-gray-500">{description}</Text>
        </View>
        <TouchableOpacity>
          <Text style={{color: themeColors.text}} className="font-semibold">
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        className="overflow-visible py-5">
        {restaurants.map((restaurant, index) => {
          return <RestaurantCard key={index} items={restaurant} />;
        })}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
