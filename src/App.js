import { View, Text, SafeAreaView, ImageBackground } from 'react-native'
import React from 'react'
import { AuthProvider } from './navigation/AuthProvider'
import Routes from './navigation/Routes'


const App = () => {
    return (
        <AuthProvider>
            <View style={{ flex: 1 }}>
                <Routes />
            </View>
        </AuthProvider>
    )
}

export default App