/* eslint-disable prettier/prettier */
import {View, Text, StatusBar, TextInput, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Icon from 'react-native-feather';
import {themeColors} from '../theme';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';

const HomeScreen = () => {
  const [featuredData, setFeaturedData] = useState([]);

  useEffect(() => {
    fetch('https://665df110e88051d60408e28d.mockapi.io/featured')
      .then(res => res.json())
      .then(data => setFeaturedData(data))
      .catch(err => console.log('Error', err));
  }, []);

  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="light-content" />
      {/*    search bar */}
      <View className="flex-row items-center space-x-2 px-4 pb-2 mt-2">
        <View className="flex-row flex-1 items-center px-2 rounded-full border border-gray-300">
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput
            placeholder="Restaurants"
            className="ml-2 flex-1"
            placeholderTextColor="gray"
          />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            <Icon.MapPin height="20" width="20" stroke="gray" />
            <Text className="text-gray-600">Hyderabad,HYD</Text>
          </View>
        </View>
        <View
          className="rounded-full p-3"
          style={{backgroundColor: themeColors.bgColor(1)}}>
          <Icon.Sliders
            width="20"
            height="20"
            strokeWidth={2.5}
            stroke="white"
          />
        </View>
      </View>
      {/* main */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}>
        {/* Categories */}
        <Categories />

        {/* featured */}

        <View className="mt-5 mb-7">
          {featuredData.map((item, index) => {
            return (
              <FeaturedRow
                key={index}
                title={item.title}
                restaurants={item.restaurants}
                description={item.description}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
