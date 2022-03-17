import React, { useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Button,
  ImageBackground,
  ScrollView,
  TextInput,
} from "react-native-web";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";
import background from "./Images/background.jpeg";

export default function App() {
  let myRef = useRef();
  let tableRef = useRef();
  let parentRef = useRef();

  //state was 1 value behind so I replaced it with global variables
  let weather;
  let location;
  //table values
  let currentTemp;
    let currentPrecip;
  let currentHumidity;
  let currentCondition;
  let currentIconUrl;

  //dates
  let currentDate=new Date();
  let tomorrow=new Date();
  tomorrow.setDate(currentDate.getDate()+1);
  let day2=new Date();
  day2.setDate(currentDate.getDate()+2);
  let day3=new Date();
  day3.setDate(currentDate.getDate()+3);
  let day4=new Date();
  day4.setDate(currentDate.getDate()+4);
  let day5=new Date();
  day5.setDate(currentDate.getDate()+5);
  let day6=new Date();
  day6.setDate(currentDate.getDate()+6);
  let day7=new Date();
  day7.setDate(currentDate.getDate()+7);


  //update table variables
  const updateTable=(obj)=>{
currentTemp=obj.currentConditions.temp.c;
console.log('temp '+currentTemp);

  }
  //get user location
  const getUserLocation = (val) => {
    location = val;
    console.log(location);
  };
  //fetch weather data
  const getWeatherInfo = () => {
    fetch(`https://weatherdbi.herokuapp.com/data/weather/${location}`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status != "fail") {
         

          setTimeout(() => {
            weather = data;
            updateTable(weather);
                displayRegion();
          }, 1000);
       
        } else {
          undefinedRegion();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //display region name
  const displayRegion = () => {
    parentRef.current.style.display ='flex';
   myRef.current.innerHTML = weather.region;
  };
  //undefined regions
  const undefinedRegion = () => {
    myRef.current.innerHTML = "Unavailable or Undefined Location";
   // tableRef.current.style.display="none";
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={background} style={styles.page}>
        <Text style={styles.name}> Beast(O) Weather </Text>
        <TextInput
          style={styles.location}
          placeholder="Please type in your location"
          onChange={(e) => {
            let userInput = e.target.value;
            getUserLocation(userInput);
          }}
        />
        <Button title="Get Weather" color="orangered" onPress={getWeatherInfo} style={styles.button}>
          Get Weather Information
        </Button>
        <View ref={parentRef} style={styles.weatherDetails}>
          <Text ref={myRef}> Region</Text>
          <Table style={styles.table} ref={tableRef}>
            <Row data={[`${currentDate}`]} style={styles.tableHeadings} />
            <Row data={["Temperature", `${currentTemp}`]} style={styles.tableData} />
            <Row data={["Precipitation", "today"]} style={styles.tableData} />
            <Row data={["Humidity", "today"]} style={styles.tableData} />
            <Row data={["Wind Speed", "today"]} style={styles.tableData} />
            <Row
              data={["Overall Condition", "today"]}
              style={styles.tableData}
            />
            <Text>7 Days Weather Forecast</Text>
          
            <Row data={[`${tomorrow}`]} style={styles.tableHeadings} />
            <Row data={["Min Temperature", "today"]} style={styles.tableData} />
            <Row data={["Max Temperature", "today"]} style={styles.tableData} />
            <Row data={["Overall Condition", "today"]} style={styles.tableData} />

            <Row data={[`${day2}`]} style={styles.tableHeadings} />
            <Row data={["Min Temperature", "today"]} style={styles.tableData} />
            <Row data={["Max Temperature", "today"]} style={styles.tableData} />
            <Row data={["Overall Condition", "today"]} style={styles.tableData} />

            <Row data={[`${day3}`]} style={styles.tableHeadings} />
            <Row data={["Min Temperature", "today"]} style={styles.tableData} />
            <Row data={["Max Temperature", "today"]} style={styles.tableData} />
            <Row data={["Overall Condition", "today"]} style={styles.tableData} />

            <Row data={[`${day4}`]} style={styles.tableHeadings} />
            <Row data={["Min Temperature", "today"]} style={styles.tableData} />
            <Row data={["Max Temperature", "today"]} style={styles.tableData} />
            <Row data={["Overall Condition", "today"]} style={styles.tableData} />

            <Row data={[`${day5}`]} style={styles.tableHeadings} />
            <Row data={["Min Temperature", "today"]} style={styles.tableData} />
            <Row data={["Max Temperature", "today"]} style={styles.tableData} />
            <Row data={["Overall Condition", "today"]} style={styles.tableData} />

            <Row data={[`${day6}`]} style={styles.tableHeadings} />
            <Row data={["Min Temperature", "today"]} style={styles.tableData} />
            <Row data={["Max Temperature", "today"]} style={styles.tableData} />
            <Row data={["Overall Condition", "today"]} style={styles.tableData} />

            <Row data={[`${day7}`]} style={styles.tableHeadings} />
            <Row data={["Min Temperature", "today"]} style={styles.tableData} />
            <Row data={["Max Temperature", "today"]} style={styles.tableData} />
            <Row data={["Overall Condition", "today"]} style={styles.tableData} />

          
          
          </Table>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
container:{

},
  location: {
    border: "solid",
    backgroundColor: "aliceblue",
    height: "10vh",
    width: "80%",
    textAlign: "center",
    marginTop: "5vh",
    marginBottom:'5vh'
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
 minHeight:'100vh',
 height:'250vh'
  },
  table: {
    width: "80vw",
    height: "40vh",
        textAlign: "center",
        
  },
  tableHeadings: {
    backgroundColor: "grey",
    height: "5vh",
    fontSize:'xx-large',
    fontWeight:'bolder'
  },
  tableData: {
    height: "5vh",
    backgroundColor: "orangered",
   
  },
  weatherDetails:{
    display:'none',
    marginTop:'5vh',
    backgroundColor: "aliceblue",
  },
});
