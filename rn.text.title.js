import React from "react";
import { Text } from "react-native";

const Title = props => (
  <Text
    style={{
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 20,
      padding: props.padding !== undefined ? props.padding : 20,
      color: "black",
      backgroundColor: "transparent"
    }}
  >
    {props.children}
  </Text>
);
export default Title;
