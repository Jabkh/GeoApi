import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import FlagApp from './screens/FlagApp';
import GpsApp from './screens/GpsApp';
import CountryApp from './screens/CountryApp';


const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="FlagApp"
          component={FlagApp}
          options={{
            title: 'FlagApp',
            tabBarLabel: 'FlagApp',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="flag" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Gps"
          component={GpsApp}
          options={{
            title: 'Gps',
            tabBarLabel: 'GpsApp',
            tabBarIcon: ({ color }) => (

              <MaterialCommunityIcons name="crosshairs-gps" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Country"
          component={CountryApp}
          options={{
            title: 'Country',
            tabBarLabel: 'CountryApp',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="globe" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
