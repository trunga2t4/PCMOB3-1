import React from "react";
import { View, Text } from "react-native";

export default function BlockRGB(props) {
  return (
    <View
      style={{
        backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
        padding: 0,
        width: props.width,
        height: props.height,
      }}
    ></View>
  );
}
