import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ImageBackground, TextInput } from 'react-native-web';
import background from "./Images/background.jpeg";
export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={background}  style={styles.page}>
      <Text style={styles.name}> Beast(O) Weather </Text>
      <TextInput style={styles.location}
      placeholder="Please type in your location"
      /> 

      <StatusBar style="auto" />

      </ImageBackground>
          
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  

    alignItems: 'center',
   
    height:"100vh"
  },
  location:{
    border:"solid",
    backgroundColor:'aliceblue',
    height:'10vh',
    width:'80%',
    textAlign:'center',
    marginTop:'5vh'
  },
  name:{
    color:'orangered',
    marginTop:'10vh',
    fontWeight:"bold",
    fontSize:'xx-large',
    backgroundColor:'black'
  },
  page:{
    width:"100vw",
    alignItems: 'center',
    height:"100vh"
    
  }

});
