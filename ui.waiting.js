import React from "react";

import { View } from "react-native";
import { BarIndicator } from "react-native-indicators";
import { invertColor } from "../util";
import { Config } from "../config";
import Fact from "./ui.fact";

class Waiting extends React.Component {
  render() {
    const { backgroundColor } = this.props;

    const bg = backgroundColor || Config.layouts?.[0]?.colors?.primary;
    const realBg = bg !== "transparent" && !!bg ? bg : "#FFFFFF";

    const inverted = invertColor(realBg);

    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: bg
        }}
      >
        {this.props.title}

        <BarIndicator
          style={{ marginVertical: 30, flex: 0 }}
          count={10}
          color={inverted}
        />
        <Fact color={inverted} />
      </View>
    );
  }
}

export default Waiting;
