import { View, Text, ImageBackground, TextInput, StyleSheet, Image, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import BG from "../assets/BG.png"
import BG2 from "../assets/BG2.png"
import emailIcon from "../assets/Icons/email.png"
import psIcon from "../assets/Icons/password.png"
import LOGO from "../assets/LOGO.png"
import { useAuth } from '../navigation/AuthProvider'
import ax from '../../core/ax'

const Login = ({ navigation }) => {
  const { setUser, setLoading, loading } = useAuth()
  const [email, setEmail] = useState("test@example.com")
  const [password, setPassword] = useState("123456")


  const submit = async () => {
    try {
      setLoading(true)
      const res = await ax.post('/login', { email, password })
      if (!res) {
        console.log("error")
      } else {
        setUser(res.data["access_token"])
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }
  return (
    <ImageBackground source={BG2} style={{ flex: 1 }} resizeMode="stretch">
      <ImageBackground source={BG} style={{ flex: 1, width: "95%", height: "95%" }} resizeMode="stretch">
        <View style={styles.container}>
          <View style={styles.logo}>
            <Image source={LOGO} />
          </View>
          <View style={styles.title}>
            <Text style={styles.titleText}>Episodic series of {"\n"}digital audio.</Text>
          </View>
          <View style={styles.inputCon}>
            <Image source={emailIcon} style={styles.img} />
            <TextInput
              onChangeText={(value) => setEmail(value)}
              value={email}
              style={styles.input}
              placeholder="E-mail address"
              placeholderTextColor={"#898F97"}
            />
          </View>
          <View style={styles.inputCon}>
            <Image source={psIcon} style={styles.img} />
            <TextInput
              onChangeText={(value) => setPassword(value)}
              value={password}
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={"#898F97"}
            />
          </View>
          <View style={styles.inputCon}>
            <TouchableOpacity style={styles.btn} onPress={() => submit()}>
              {!loading ? <Text style={{ color: "white", fontSize: 16 }}>Login</Text> : <ActivityIndicator size="small" color="white" />}
            </TouchableOpacity>
           </View>
        </View>
      </ImageBackground>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", width: "95%", height: "95%" },
  input: {
    marginBottom: 16,
    borderWidth: 1,
    height: 58,
    width: "80%",
    marginLeft: "10%",
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderColor: "rgba(255, 255, 255, 0.15)",
    paddingLeft: 64,
    color: "white"
  },
  inputCon: {
    width: "100%",
    position: "relative",
  },
  img: {
    position: "absolute",
    left: "17%",
    top: 23,
    width: 16,
    height: 13,
    resizeMode: "contain"

  },
  btn: {
    width: "80%",
    backgroundColor: "#3369FF",
    borderRadius: 99,
    shadowColor: "#3369FF",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
    marginLeft: "10%"
  },
  title: {
    width: "100%",
    marginLeft: "20%",
    marginTop: "12%",
    marginBottom: "14%"

  },
  titleText: {
    color: "white",
    fontWeight: "500",
    fontSize: 24,

  },
  logo: {
    width: "100%",

    marginLeft: "20%",
    marginTop: 80
  }


})

export default Login