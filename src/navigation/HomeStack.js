import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import BrowserPodcasts from "../components/BrowserPodcasts"
import Podcast from '../components/Podcast'

const Stack = createNativeStackNavigator();


const Pages = () => {
  return (
    <Stack.Navigator initialRouteName='browser-podcast' screenOptions={{ headerShown: false }} >
      <Stack.Screen options={{ title: "Browser Podcasts" }} name='browser-podcast' component={BrowserPodcasts} />
      <Stack.Screen options={{ title: "Podcast" }} name='podcast' component={Podcast} />
    </Stack.Navigator>
  )
}

const HomeStack = () => {
  return (
    <NavigationContainer>
      <Pages />
    </NavigationContainer>
  )
}
export default HomeStack