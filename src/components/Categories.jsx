/* eslint-disable prettier/prettier */
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(res => res.json())
      .then(data => setCategoryData(data.categories))
      .catch(err => console.log('Error', err));
  }, []);
  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{paddingHorizontal: 15}}>
        {categoryData.map((category, index) => {
          let isActive = category?.idCategory === activeCategory;
          let btnClass = isActive ? 'bg-gray-600' : 'bg-gray-300';
          let textClass = isActive
            ? 'font-semibold text-gray-800'
            : 'text-gray-500';
          return (
            <View key={index} className="flex justify-center items-center mr-6">
              <TouchableOpacity
                className={`p-1 rounded-full shadow bg-gray-300 ${btnClass}`}
                onPress={() => setActiveCategory(category?.idCategory)}>
                <Image
                  style={{width: 45, height: 45}}
                  source={{uri: `${category?.strCategoryThumb}`}}
                  className="rounded-full"
                />
              </TouchableOpacity>
              <Text className={`text-black text-sm ${textClass}`}>
                {category?.strCategory}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Categories;
