import React, { useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Button,
  ImageBackground,
  ScrollView,
  TextInput,
  StatusBar,
  Image,
} from "react-native";
import { Table, Row } from "react-native-table-component";
import background from "./Images/background.jpeg";

export default function App() {
  let myRef = useRef();
  let tableRef = useRef();
  let parentRef = useRef();

  //table values
  const [currentTemp, setCurrentTemp] = useState("---");
  const [currentPrecip, setCurrentPrecip] = useState("---");
  const [currentSummary, setCurrentSummary] = useState("---");
  const [currentWind, setCurrentWind] = useState("---");
  const [currentHumidity, setCurrentHumidity] = useState("---");

  //day1
  const [day1MinTemp, setDay1MinTemp] = useState("---");
  const [day1MaxTemp, setDay1MaxTemp] = useState("---");
  const [day1Summary, setDay1Summary] = useState("---");

  //day2
  const [day2MinTemp, setDay2MinTemp] = useState("---");
  const [day2MaxTemp, setDay2MaxTemp] = useState("---");
  const [day2Summary, setDay2Summary] = useState("---");

  //day3
  const [day3MinTemp, setDay3MinTemp] = useState("---");
  const [day3MaxTemp, setDay3MaxTemp] = useState("---");
  const [day3Summary, setDay3Summary] = useState("---");

  //day4
  const [day4MinTemp, setDay4MinTemp] = useState("---");
  const [day4MaxTemp, setDay4MaxTemp] = useState("---");
  const [day4Summary, setDay4Summary] = useState("---");

  //day5
  const [day5MinTemp, setDay5MinTemp] = useState("---");
  const [day5MaxTemp, setDay5MaxTemp] = useState("---");
  const [day5Summary, setDay5Summary] = useState("---");

  //day6
  const [day6MinTemp, setDay6MinTemp] = useState("---");
  const [day6MaxTemp, setDay6MaxTemp] = useState("---");
  const [day6Summary, setDay6Summary] = useState("---");

  //day7
  const [day7MinTemp, setDay7MinTemp] = useState("---");
  const [day7MaxTemp, setDay7MaxTemp] = useState("---");
  const [day7Summary, setDay7Summary] = useState("---");

  //state was 1 value behind so I replaced it with global variables
  //Note: state works but there is need for a timeout
  let weather;
  let location;

  //dates
  let currentDate = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(currentDate.getDate() + 1);
  let day2 = new Date();
  day2.setDate(currentDate.getDate() + 2);
  let day3 = new Date();
  day3.setDate(currentDate.getDate() + 3);
  let day4 = new Date();
  day4.setDate(currentDate.getDate() + 4);
  let day5 = new Date();
  day5.setDate(currentDate.getDate() + 5);
  let day6 = new Date();
  day6.setDate(currentDate.getDate() + 6);
  let day7 = new Date();
  day7.setDate(currentDate.getDate() + 7);

  //update table variables

  const updateTable = (obj) => {
    setTimeout(() => {
      //today
      setCurrentTemp(obj.currentConditions.temp.c + "°C");
      setCurrentHumidity(obj.currentConditions.humidity);
      setCurrentPrecip(obj.currentConditions.precip);
      setCurrentWind(obj.currentConditions.wind.km + " km/hr");
      setCurrentSummary(obj.currentConditions.comment);
      //FORECASTS
      //dAY1
      setDay1MinTemp(obj.next_days[1].min_temp.c + "°C");
      setDay1MaxTemp(obj.next_days[1].max_temp.c + "°C");
      setDay1Summary(obj.next_days[1].comment);

      //dAY2
      setDay2MinTemp(obj.next_days[2].min_temp.c + "°C");
      setDay2MaxTemp(obj.next_days[2].max_temp.c + "°C");
      setDay2Summary(obj.next_days[2].comment);
      //dAY3
      setDay3MinTemp(obj.next_days[3].min_temp.c + "°C");
      setDay3MaxTemp(obj.next_days[3].max_temp.c + "°C");
      setDay3Summary(obj.next_days[3].comment);
      //dAY4
      setDay4MinTemp(obj.next_days[4].min_temp.c + "°C");
      setDay4MaxTemp(obj.next_days[4].max_temp.c + "°C");
      setDay4Summary(obj.next_days[4].comment);
      //dAY5
      setDay5MinTemp(obj.next_days[5].min_temp.c + "°C");
      setDay5MaxTemp(obj.next_days[5].max_temp.c + "°C");
      setDay5Summary(obj.next_days[5].comment);
      //dAY6
      setDay6MinTemp(obj.next_days[6].min_temp.c + "°C");
      setDay6MaxTemp(obj.next_days[6].max_temp.c + "°C");
      setDay6Summary(obj.next_days[6].comment);
      //dAY7
      setDay7MinTemp(obj.next_days[7].min_temp.c + "°C");
      setDay7MaxTemp(obj.next_days[7].max_temp.c + "°C");
      setDay7Summary(obj.next_days[7].comment);
    }, 2000);
  };
  //get user location
  const getUserLocation = (val) => {
    location = val;
  };
  //fetch weather data
  const getWeatherInfo = () => {
    fetch(`https://weatherdbi.herokuapp.com/data/weather/${location}`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
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
        alert("An error occured");
      });
  };
  //display region name
  const displayRegion = () => {
    parentRef.current.style.display = "flex";
    myRef.current.innerHTML = weather.region;
  };
  //undefined regions
  const undefinedRegion = () => {
    parentRef.current.style.display = "grid";
    myRef.current.innerHTML = "Unavailable or Undefined Location";
    tableRef.current.style.display = "none";
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={background} style={styles.page}>
        <View style={styles.nav}>
          <Image
            source={require("./assets/icon.png")}
            style={{ width: 50, height: 50, marginTop: "0" }}
          />
          <Button
            title="About Us"
            color="rgb(242,156,24)"
            onPress={() => {
              alert(
                "Beas(O) Technologies is an merging African technology company. Our main aim is to gear up Africa with necessary tech-resources so that the continent is not left behind in the ongoing Digital Revolution"
              );
            }}
          />
          <Button
            title="Contact Us"
            color="rgb(242,156,24)"
            onPress={() => {
              alert(
                "Get in touch with the Developer on LinkedIn:  https://www.linkedin.com/in/kudakwashe-shambare/"
              );
            }}
          />
        </View>

        <Text style={styles.name}> Beast(O) Weather </Text>
        <TextInput
          style={styles.location}
          placeholder="Please type in your location"
          onChange={(e) => {
            let userInput = e.target.value;
            getUserLocation(userInput);
          }}
        />
        <Button
          title="Get Weather"
          color="rgb(242,156,24)"
          onPress={getWeatherInfo}
        />
        <View ref={parentRef} style={styles.weatherDetails}>
          <Text ref={myRef}> Region</Text>
          <Table style={styles.table} ref={tableRef}>
            <Row data={[`${currentDate}`]} style={styles.tableHeadings} />
            <Row
              data={["Temperature", `${currentTemp} `]}
              style={styles.tableData}
            />
            <Row
              data={["Precipitation", `${currentPrecip}`]}
              style={styles.tableData}
            />
            <Row
              data={["Humidity", `${currentHumidity}`]}
              style={styles.tableData}
            />
            <Row
              data={["Wind Speed", `${currentWind}`]}
              style={styles.tableData}
            />
            <Row
              data={["Overall Condition", `${currentSummary}`]}
              style={styles.tableData}
            />
            <Text>7 Days Weather Forecast</Text>

            <Row data={[`${tomorrow}`]} style={styles.tableHeadings} />
            <Row
              data={["Min Temperature", `${day1MinTemp}`]}
              style={styles.tableData}
            />
            <Row
              data={["Max Temperature", `${day1MaxTemp}`]}
              style={styles.tableData}
            />
            <Row
              data={["Overall Condition", `${day1Summary}`]}
              style={styles.tableData}
            />

            <Row data={[`${day2}`]} style={styles.tableHeadings} />
            <Row
              data={["Min Temperature", `${day2MinTemp}`]}
              style={styles.tableData}
            />
            <Row
              data={["Max Temperature", `${day2MaxTemp}`]}
              style={styles.tableData}
            />
            <Row
              data={["Overall Condition", `${day2Summary}`]}
              style={styles.tableData}
            />

            <Row data={[`${day3}`]} style={styles.tableHeadings} />
            <Row
              data={["Min Temperature", `${day3MinTemp}`]}
              style={styles.tableData}
            />
            <Row
              data={["Max Temperature", `${day3MaxTemp}`]}
              style={styles.tableData}
            />
            <Row
              data={["Overall Condition", `${day3Summary}`]}
              style={styles.tableData}
            />

            <Row data={[`${day4}`]} style={styles.tableHeadings} />
            <Row
              data={["Min Temperature", `${day4MinTemp}`]}
              style={styles.tableData}
            />
            <Row
              data={["Max Temperature", `${day4MaxTemp}`]}
              style={styles.tableData}
            />
            <Row
              data={["Overall Condition", `${day4Summary}`]}
              style={styles.tableData}
            />

            <Row data={[`${day5}`]} style={styles.tableHeadings} />
            <Row
              data={["Min Temperature", `${day5MinTemp}`]}
              style={styles.tableData}
            />
            <Row
              data={["Max Temperature", `${day5MaxTemp}`]}
              style={styles.tableData}
            />
            <Row
              data={["Overall Condition", `${day5Summary}`]}
              style={styles.tableData}
            />

            <Row data={[`${day6}`]} style={styles.tableHeadings} />
            <Row
              data={["Min Temperature", `${day6MinTemp}`]}
              style={styles.tableData}
            />
            <Row
              data={["Max Temperature", `${day6MaxTemp}`]}
              style={styles.tableData}
            />
            <Row
              data={["Overall Condition", `${day6Summary}`]}
              style={styles.tableData}
            />

            <Row data={[`${day7}`]} style={styles.tableHeadings} />
            <Row
              data={["Min Temperature", `${day7MinTemp}`]}
              style={styles.tableData}
            />
            <Row
              data={["Max Temperature", `${day7MaxTemp}`]}
              style={styles.tableData}
            />
            <Row
              data={["Overall Condition", `${day7Summary}`]}
              style={styles.tableData}
            />
          </Table>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  location: {
    border: "solid",
    backgroundColor: "aliceblue",
    height: "10vh",
    width: "80%",
    textAlign: "center",
    marginTop: "5vh",
    marginBottom: "5vh",
  },
  name: {
    color: "rgb(240,117,15)",
    marginTop: "10vh",
    fontWeight: "bold",
    fontSize: "xx-large",
    backgroundColor: "black",
    padding: "2vh",
  },
  page: {
    width: "100vw",
    alignItems: "center",
    minHeight: "100vh",
    height: "230vh",
  },
  table: {
    width: "80vw",
    height: "40vh",
    textAlign: "center",
  },
  tableHeadings: {
    backgroundColor: "grey",
    height: "5vh",
    fontSize: "xx-large",
    fontWeight: "bolder",
  },
  tableData: {
    height: "5vh",
    backgroundColor: "rgb(240,117,15)",
  },
  weatherDetails: {
    display: "none",
    marginTop: "5vh",
    backgroundColor: "aliceblue",
  },
  nav: {
    width: "100%",
    height: "10vh",

    padding: "3vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "grey",
  },
  navItems: {
    color: "rgb(240,117,15)",
    fontSize: "larger",
    fontWeight: "black",
    backgroundColor: "black",
    height: "5vh",
    padding: "1vh",
  },
});
