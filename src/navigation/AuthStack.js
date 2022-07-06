import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../components/Login"

const Stack = createNativeStackNavigator()
const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='login'>
        <Stack.Screen name='login' options={{
          headerShown: false
        }} component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthStack