import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button, ImageBackground, TextInput } from "react-native-web";
import background from "./Images/background.jpeg";

export default function App() {
  const [userLocation, setUserLocation] = useState("");
  const [weather, setWeather] = useState();
  
  let location;
  //get user location

  const getUserLocation=(val)=>{
    location=val;
    console.log(location);


  }
  //fetch weather data
  const getWeatherInfo = () => {
    
    if (location !== "") {
      
      fetch(`https://weatherdbi.herokuapp.com/data/weather/${location}`)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          console.log(data);
          setWeather(data);
          console.log(weather);
        });
    }
    else{
      console.log('no input');
    }
  };
  
  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.page}>
        <Text style={styles.name}> Beast(O) Weather </Text>
        <TextInput
          style={styles.location}
          placeholder="Please type in your location"
    
         onChange={(e)=>{
                            let userInput=e.target.value;
          getUserLocation(userInput);
         }}
          
        />
        <Button title="Get Weather" color="orangered" onPress={getWeatherInfo}>
          Get Weather Information
        </Button>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",

    height: "100vh",
  },
  location: {
    border: "solid",
    backgroundColor: "aliceblue",
    height: "10vh",
    width: "80%",
    textAlign: "center",
    marginTop: "5vh",
  },
  name: {
    color: "orangered",
    marginTop: "10vh",
    fontWeight: "bold",
    fontSize: "xx-large",
    backgroundColor: "black",
  },
  page: {
    width: "100vw",
    alignItems: "center",
    height: "100vh",
  },
});
