import React from "react";
import { View, Text } from "react-native";
import { Touchable } from "../index.leckr.imports";

class BigButton extends React.Component {

  render() {
    const {
      style,
      title,
      subtitle,
      onPress,
      color,
      backgroundColor
    } = this.props;

    return (
      <Touchable onPress={onPress}>
        <View
          style={{
            ...style,
            width: "80%",
            height: 50,
            backgroundColor: backgroundColor || "#CCC",
            borderRadius: 25,
            borderStyle: "solid",
            borderWidth: 1,
            paddingHorizontal: 10,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center"
          }}
        >
          <Text
            style={{ fontSize: 20, fontWeight: "600", color: color || "black" }}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text style={{ color: color || "black" }}>{subtitle}</Text>
          ) : (
            undefined
          )}
        </View>
      </Touchable>
    );
  }

}

export default BigButton;
