import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Screen imports
import SplashScreen from './src/screens/SplashScreen.js';
import HomeScreen from './src/screens/HomeScreen.js';
import DetailsScreen from './src/screens/DetailsScreen';
import SearchScreen from './src/screens/SearchScreen';
import styles from './style.js';

// API endpoint constant
const API_ENDPOINT = 'https://api.tvmaze.com/search/shows?q=all';

const Tab = createBottomTabNavigator();

//Main App component that handles navigation and initial data fetching
export default function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [initialMovie, setInitialMovie] = useState(null);

  // Fetch initial random show data when app starts
  useEffect(() => {
    fetchRandomShow();
  }, []);

  //Fetches a random show from the API
  const fetchRandomShow = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();

      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setInitialMovie(data[randomIndex].show);
      }
    } catch (error) {
      console.error('Error fetching random show:', error);
    }
  };

  //Callback to handle splash screen completion
  const handleSplashEnd = () => setSplashVisible(false);

  //Creates tab icon component
  const createTabIcon = (focusedIcon, unfocusedIcon) => {
    return ({ focused, color }) => (
      <View style={styles.tabIconContainer}>
        <Icon
          name={focused ? focusedIcon : unfocusedIcon}
          size={24}
          color={color}
        />
      </View>
    );
  };

  // Common screen options for tab navigator
  const screenOptions = {
    headerShown: false,
    tabBarStyle: styles.tabBar,
    tabBarActiveTintColor: '#fff',
    tabBarInactiveTintColor: '#666',
    tabBarLabelStyle: styles.tabLabel,
  };

  // Show splash screen
  if (isSplashVisible) {
    return <SplashScreen onSplashEnd={handleSplashEnd} />;
  }

  // Loading state while fetching initial movie
  if (!initialMovie) {
    return <View style={styles.loadingContainer} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: createTabIcon('home', 'home-outline'),
          }}
        />
        <Tab.Screen
          name="Details"
          component={DetailsScreen}
          initialParams={{ movie: initialMovie }}
          options={{
            tabBarLabel: 'Details',
            tabBarIcon: createTabIcon('play-circle', 'play-circle-outline'),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: createTabIcon('search', 'search-outline'),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}