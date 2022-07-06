import { View, StyleSheet, SafeAreaView, ImageBackground, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeStack from "./HomeStack"
import AuthStack from './AuthStack';
import { useAuth } from './AuthProvider';
import BG from "../assets/BG.png"
const Routes = () => {
  const { user, loading } = useAuth();
  if (!user) {
    return (
        <AuthStack />
    )
  } else {
    return (
          <HomeStack />
    )
  }
}

export default Routes