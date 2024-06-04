/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import CartScreen from './screens/CartScreen';
import OrderPrepairingScreen from './screens/OrderPrepairingScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Welcome">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
        <Stack.Screen
          name="Cart"
          options={{presentation: 'modal'}}
          component={CartScreen}
        />
        <Stack.Screen
          name="OrderPrepairing"
          options={{presentation: 'fullScreenModal'}}
          component={OrderPrepairingScreen}
        />
        <Stack.Screen
          name="Delivery"
          options={{presentation: 'fullScreenModal'}}
          component={DeliveryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
