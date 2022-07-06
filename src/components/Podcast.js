import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, SliderComponent } from 'react-native'
import React, { useEffect, useState } from 'react'
import detailBg from "../assets/detailsBg.png"
import back from "../assets/Icons/geri.png"
import forward from "../assets/Icons/Forward.png"
import backword from "../assets/Icons/Back.png"
import hamburger from "../assets/Icons/Hamburger_menu.png"
import pause from "../assets/Icons/Pause.png"
import play from "../assets/Icons/Play.png"
import glow from "../assets/Glow.png"
import au1 from "../assets/Author_1.png"
import au2 from "../assets/Author_2.png"
import Sound from "react-native-sound"
import Slider from '@react-native-community/slider';
import likeBtn from "../assets/Icons/Like/On.png"
import dislikeBtn from "../assets/Icons/Like/Off.png"
import dowlandIcon from "../assets/dowlands.png"
import musicIcon from "../assets/soundw.png"
import threeIcon from "../assets/three.png"
import {RNFetchBlob} from 'rn-fetch-blob'
import { platform } from 'react-native-os'



const Podcast = ({ route: { params }, navigation }) => {
  const newHeight = Dimensions.get('window').height
  const newWith = Dimensions.get('window').width
  const [loading, setLoading] = useState(false)
  const [paused, setPaused] = useState(true)
  const [recording, setRecording] = useState(false)
  const [duration, setDuration] = useState(null)
  const [currentSecond, setCurrentSecond] = useState(0)
  console.log(params)
  let sound;
  useEffect(() => {
    Sound.setCategory("Playback", true)
    return () => {
      if (sound) sound.release();
    }
  }, [])

  requestToPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Music',
          message:
            'App needs access to your Files... ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('startDownload...');
        this.startDownload();
      }
    } catch (err) {
      console.log(err);
    }
  };


  startDownload = (url,name) => {
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'mp3',
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: name,
        path: RNFetchBlob.fs.dirs.DownloadDir + `${name}`, // Android platform
        description: 'Downloading the file',
      },
    })
      .fetch('GET', url)
      .then(res => {
        console.log('res', res);
        console.log('The file is save to ', res.path());
      });
  };
  const playSound = () => {
    sound = new Sound(params.audio_url, "", (error, _sound) => {
      if (error) {
        console.log(error)
        return;
      }
      setDuration(sound.getDuration())
      setPaused(false)
      if (currentSecond == 0) {
        sound.play(() => {
          sound.release()
        });
      } else {
        sound.play(() => {
          sound.setCurrentTime(currentSecond)
          sound.release()
        })
      }

    });
    setRecording(sound)
  }
  const stopSound = () => {
    recording.stop(() => {
      console.log("Stoping")
    })
  }
  const pauseSound = () => {
    if (recording) {
      recording.getCurrentTime((sec, p) => {
        setCurrentSecond(sec)
      })
      recording.pause(() => {
        setPaused(true)
        console.log("paused")
      })
    }
  }
  const backPage = () => {
    if (recording) {
      stopSound()
    }
    navigation.goBack()
  }
  const nextTenSeconds = () => jumpSecond(10)
  const prevTenSeconds = () => jumpSecond(-10)
  const jumpSecond = (secsDelta) => {
    if (recording) {
      recording.getCurrentTime((secs, isPlaying) => {
        let nextSecs = secs + secsDelta;
        if (nextSecs < 0) nextSecs = 0;
        else if (nextSecs > duration) nextSecs = duration;
        recording.setCurrentTime(nextSecs);
        setCurrentSecond(nextSecs)
      })
    }
  }
  useEffect(() => {
    playSound()
    const rendering = setInterval(() => {
      if (recording) {
        recording.getCurrentTime((sec, i) => setCurrentSecond(sec))
      }
    }, 1000);
    return () => {
      clearInterval(rendering)
    }
  }, [])




  const getAudioTimeString = (seconds) => {
    const h = parseInt(seconds / (60 * 60));
    const m = parseInt(seconds % (60 * 60) / 60);
    const s = parseInt(seconds % 60);
    return ((h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s));
  }
  const currentTimeString = getAudioTimeString(currentSecond);
  const durationString = getAudioTimeString(duration);


  return (
    <View style={{ backgroundColor: "#151F2A", flex: 1, alignItems: "center" }}>
      <ImageBackground style={{ paddingTop: 60, width: "100%", height: newHeight / 2.2, alignItems: "center" }} source={detailBg}>
        <View style={{ justifyContent: "space-between", flexDirection: "row", width: "85%", marginBottom: "15%" }}>
          <TouchableOpacity onPress={() => backPage()}>
            <Image source={back} />
          </TouchableOpacity>
          <TouchableOpacity  >
            <Image source={hamburger} />
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text style={{ color: "white", width: "85%", fontSize: 24, textAlign: "center", marginBottom: 12 }}>{params.title}</Text>
          <Text style={{ color: "#898F97", fontSize: 14 }}>{params.author}</Text>
          <ImageBackground source={glow} style={{ width: "100%", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
            <Image source={au1} />
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
              <TouchableOpacity onPress={prevTenSeconds}><Image source={backword} /></TouchableOpacity>
              {paused ? <TouchableOpacity onPress={playSound}
              ><Image style={{ width: newWith / 2.5 }} source={play} />
              </TouchableOpacity> : <TouchableOpacity onPress={pauseSound}
              ><Image style={{ width: newWith / 2.5 }} source={pause} />
              </TouchableOpacity>}
              <TouchableOpacity onPress={nextTenSeconds}><Image source={forward} /></TouchableOpacity>
            </View>
            <Image source={au2} />
          </ImageBackground>
        </View>
      </ImageBackground>
      <View style={{ backgroundColor: "#09121C", width: "100%", alignItems: "center", alignContent: "space-between", height: 50, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
        <Slider
          style={{ width: "85%", height: 20, marginTop: 20 }}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor="#3369FF"
          maximumTrackTintColor="#fff"
          step={1}
          value={currentSecond}
          onValueChange={(value) => { setCurrentSecond(value) }}
        />
      </View>
      <ScrollView scrollEnabled={false} style={{ width: "100%", height: "100%", backgroundColor: "#09121C" }}>
        <View style={{ width: "100%", marginBottom: 12, height: "100%", flexDirection: "row", flex: 1, justifyContent: "space-between", alignSelf: "center", marginTop: 14, width: "85%", alignItems: "center", borderBottomWidth: .3, paddingBottom: 14, borderColor: "#898F97" }}>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={likeBtn} />
            <Text style={{ color: "white", marginLeft: 5 }}>{params.likes}</Text>
          </TouchableOpacity>
          <View>
            <Text style={{ color: "white" }}>{currentTimeString}</Text>
          </View>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "#898F97" }}>{params.dislikes}</Text>
            <Image source={dislikeBtn} style={{ transform: [{ rotateX: "180deg" }], marginLeft: 5 }} />
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", height: "100%", marginBottom: 12, flexDirection: "row", flex: 1, justifyContent: "space-between", alignSelf: "center", marginTop: 14, width: "85%", alignItems: "center", }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginRight: 24 }}>
              <View style={{ backgroundColor: "#19232F", borderRadius: 50, width: 32, height: 32, alignItems: "center", justifyContent: "center" }}>
                <Image source={musicIcon} />
              </View>
              <Text style={{ color: "white", marginLeft: 7 }}>Episode 2</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={platform.OS == "android" ?()=>startDownload(params.audio_url,params.author):()=>{}}
            style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={dowlandIcon} />
              <Text style={{ color: "white", marginLeft: 5 }}>{params.file_size}mb</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Image source={threeIcon} />
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", height: "100%", flexDirection: "row", flex: 1, justifyContent: "space-between", alignSelf: "center", marginTop: 14, width: "85%", alignItems: "center", }}>
          <Text style={{ color: "#898F97", fontSize: 13, lineHeight: 20 }}>{params.description}</Text>
        </View>
      </ScrollView>

    </View>
  )
}

export default Podcast