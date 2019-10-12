import React from "react";

import { TouchableOpacity, Text } from "react-native";
/**
 * BigButton: Big (80% width) gray button with borderRadius
 * @param {*} props, onPress!, title!, style?
 *
 */
const BigButton = ({ onPress, title, style }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      {
        backgroundColor: "#CCC",
        height: 40,
        borderRadius: 20,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center"
      },
      style
    ]}
  >
    <Text>{title}</Text>
  </TouchableOpacity>
);

export default BigButton;
