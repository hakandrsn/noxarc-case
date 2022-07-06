import { View, Text, ImageBackground, StyleSheet, Image,TextInput, FlatList, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import BG from "../assets/BG.png"
import LOGO from "../assets/LOGO.png"
import finding from "../assets/Icons/Search.png"
import List from './categories'
import ax from '../../core/ax'
import { useAuth } from '../navigation/AuthProvider'
import pcbg1 from "../assets/pcbg1.png"
import pcbg2 from "../assets/pcbg2.png"
import play from "../assets/Icons/Play.png"
import time from "../assets/Icons/Time.png"
import pp from "../assets/Icons/Authors.png"


const BrowserPodcasts = ({navigation}) => {
  const { user, loading } = useAuth()
  const [data, setData] = useState([])
  const [selected, setSelected] = useState(List[0].name)
  const [search, setSearch] = useState("")
  const searchingValue = data.filter(item => {
    if (search == "") return data
    return item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.author.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())

  })
  useEffect(() => {
    const fetchPodcasts = async () => {
      const auth = {
        headers: {
          "Authorization": "Bearer " + user
        }
      }
      const res = await ax.get("/search", auth)
      setData(res.data)
    }
    fetchPodcasts()
  }, [selected])
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.flatlist}
        onPress={() => setSelected(item.name)}
      >
        <Image style={styles.flatImage} source={selected == item.name ? item.imageOn : item.imageOff} />
      </TouchableOpacity>
    )
  }
  const day = new Date().getDate() + "." + new Date().getMonth().toLocaleString(2) + "." + new Date().getFullYear()
  const hour = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
  const renderItemPodcasts = ({ item, index }) => {
    return (
      <ImageBackground source={index % 2 == 0 ? pcbg1 : pcbg2} style={styles.flatlist2}      >
        <View style={{ padding: 32 }}>
          <View style={{ marginBottom: 19, height: "50%" }}>
            <Text style={{ color: "white", fontSize: 24 }}>{item.title}</Text>
          </View>
          <View style={styles.bottomConPod}>
            <View style={styles.leftCon}>
              <View style={{ flexDirection: "row" ,marginBottom:5}}>
                <Text style={{ color: "#898F97" }}>{day} </Text>
                <Image source={time} style={{ marginHorizontal: 3, width: 15, resizeMode: "contain" }} />
                <Text style={{ color: "#898F97" }}>{hour}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image source={pp} style={{ marginRight: 3 }} />
                <Text style={{ color: "white" }}>{item.author}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.playBtn} onPress={()=>navigation.navigate("podcast",item)} >
              <Image source={play} style={styles.playImage} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    )
  }
  return (
    <View style={{ backgroundColor: "#09121C", flex: 1 }}>
      <View style={styles.container2}>
        <View style={styles.logo}>
          <Image source={LOGO} style={styles.logoTxt} />
        </View>
        <View style={styles.logo}>
          <Text style={styles.headerTxt}>Browse</Text>
        </View>
        <View style={styles.search}>
          <Image source={finding} style={styles.searchLogo} />
          <TextInput
            placeholder='Search'
            placeholderTextColor={"#898F97"}
            style={styles.searchInput}
            onChangeText={text => setSearch(text)}
          />
        </View>
        <View style={styles.flatCon}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            scrollEnabled={true}
            data={List}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View>
          <Text style={{ color: "#898F97", marginBottom: 24, fontSize: 16 }}>{selected}</Text>
        </View>
        <View >
          <FlatList
            scrollEnabled={true}
            data={searchingValue}
            renderItem={({ item, index }) => renderItemPodcasts({ item, index })}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

  },
  container2: {
    paddingHorizontal: 33,
    paddingTop: 58,
  },
  logo: {
    marginBottom: 17,
  },
  logoTxt: {
    resizeMode: "contain",
    width: 100,
  },
  headerTxt: {
    fontSize: 48,
    fontWeight: "700",
    color: "white",
    marginBottom: 32
  },
  searchInput: {
    backgroundColor: "#010304",
    padding: 16,
    borderRadius: 16,
    color: "white",
  },
  search: {
    position: "relative",
  },
  searchLogo: {
    position: "absolute",
    zIndex: 1,
    right: "5%",
    top: "25%",
    resizeMode: "contain",
    width: 20,
    height: 20,
    color: "#DADADA"

  },
  flatCon: {
    position: "relative",
    width: "120%",
    marginTop: 32,
    marginBottom: 32
  },
  flatlist: {
    width: "29%",
  },
  flatImage: {
    height: 90,
    width: 56,
    resizeMode: "contain",
  },
  flatlist2: {
    width: "100%",
    height: 180,
    marginBottom: 20,
    position: "relative",
  },
  bottomConPod: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  playBtn: {
    position: "relative",
    resizeMode: "contain",
    width: 50,
    height: 50,
  },
  playImage: {
    resizeMode: "contain",
    position: "absolute",
    right: "-90%",
    bottom: "-90%",
  },
})

export default BrowserPodcasts