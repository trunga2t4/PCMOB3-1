import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { Image, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./components/BlockRGB";
import { TouchableOpacity } from "react-native-gesture-handler";

function HomeS({ navigation }) {
  const screenWidth = Dimensions.get("window").width;
  const numColumns = 3;
  const tileWidth = screenWidth - 100;
  const tileSize = Math.floor(tileWidth / numColumns);
  const [colorArray, setColorArray] = useState([]);

  function addColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let textColor = (red + green + blue) / 3 >= 128 ? "black" : "white";
    return setColorArray((state) => [
      {
        red: red,
        green: green,
        blue: blue,
        size: tileSize,
        randHeight: Math.max(
          5,
          5 + Math.floor(Math.random() * (tileSize / 1.5 - 5))
        ),
        textColor: textColor,
        id: `${colorArray.length}`,
      },
      ...state,
    ]);
  }
  const emptyColor = () => setColorArray(() => []);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Selected Colour", { ...item })}
        onLongPress={emptyColor}
      >
        <BlockRGB
          red={item.red}
          green={item.green}
          blue={item.blue}
          width={item.size}
          height={item.size}
        />
      </TouchableOpacity>
    );
  }

  function renderRandItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Selected Colour", { ...item })}
        onLongPress={emptyColor}
      >
        <BlockRGB
          red={item.red}
          green={item.green}
          blue={item.blue}
          width={100}
          height={item.randHeight}
        />
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={addColor} title="Add Colour" />,
    });
  });

  return (
    <View style={[styles.container, { flexDirection: "row" }]}>
      <View style={[styles.container, { width: tileWidth }]}>
        <FlatList
          style={styles.list}
          data={colorArray}
          renderItem={renderItem}
          numColumns={numColumns}
        />
        <StatusBar style="auto" />
      </View>
      <View style={{ width: 100 }}>
        <FlatList
          style={styles.list}
          data={colorArray}
          renderItem={renderRandItem}
        />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

function DetailS({ route }) {
  const { red, green, blue, textColor } = route.params;
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgb(${red}, ${green}, ${blue})` },
      ]}
    >
      <TouchableOpacity onPress={() => navigation.popToTop()}>
        <View style={[styles.container2, { padding: 30 }]}>
          <Text style={[styles.text, { color: textColor }]}>Red: {red}</Text>
          <Text style={[styles.text, { color: textColor }]}>
            Green: {green}
          </Text>
          <Text style={[styles.text, { color: textColor }]}>Blue: {blue}</Text>
        </View>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Colour Tiles"
          component={HomeS}
          options={{
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Selected Colour"
          component={DetailS}
          options={{
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 20,
    width: "100%",
  },
  list: {
    width: "100%",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
