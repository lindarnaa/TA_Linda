import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import DetailAPOD from './screens/DetailAPOD';
import DetailMarsPhoto from './screens/DetailMarsPhoto';
import ProfileScreen from './screens/ProfileScreen';
import NewsScreen from './screens/NewsScreen';
import DetailNewsScreen from './screens/DetailNewsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack for News Section
function NewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="NewsMain" 
        component={NewsScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="DetailNews" 
        component={DetailNewsScreen} 
        options={{ headerShown: false }} // Hide header for DetailNews
      />
    </Stack.Navigator>
  );
}

// Stack for Home Section
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="DetailAPOD" 
        component={DetailAPOD} 
        options={{ headerShown: false }} // Hide header for DetailAPOD
      />
      <Stack.Screen 
        name="DetailMarsPhoto" 
        component={DetailMarsPhoto} 
        options={{ headerShown: false }} // Hide header for DetailMarsPhoto
      />
    </Stack.Navigator>
  );
}

// Main Tab Navigator that houses the Home, News, and Profile tabs
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
          borderRadius: 35,
          height: 65,
          position: 'absolute',
          left: 10,
          right: 10,
          bottom: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 15,
          elevation: 10,
        },
        tabBarIconStyle: {
          marginTop: 5,
          marginBottom: 0,
        },
        tabBarLabelStyle: {
          marginBottom: 5,
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsStack}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="newspaper-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="person-outline" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

// Root Stack Navigator that handles the SplashScreen and Main Tabs
function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Splash" 
        component={SplashScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Main" 
        component={MainTabNavigator} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

// Main App component that includes the NavigationContainer and RootNavigator
export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
