/**
 * #wip
 * - [x] initial setup, simple
 * - [ ] test it on `screen.home` #totest
 * - [ ] improve UI
 * - [ ] add close button
 * - [ ] add optional title
 * - [ ] add animation
 * - [ ]
 */

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as Icon from "@expo/vector-icons";
import { allSides } from "../util";

type Props = {
  text: string,
  title?: string
};
/**
 * Responsibilities: Render card that can be closed with a black X. This will animate it closed.
 */
class ClosableInfoCard extends React.Component<Props> {

  closeSlowly() {
    //should do animation.
  }

  render() {
    const { text, colors } = this.props;

    return (
      <View
        style={{
          width: "100%",
          backgroundColor: colors?.primary,
          padding: 20,
          minHeight: 100,
          justifyContent: "center"
        }}
      >
        <View style={{ position: "absolute", right: 10, top: 10 }}>
          <TouchableOpacity
            hitSlop={allSides(20)}
            onPress={() => this.closeSlowly()}
          >
            <Icon.Entypo name="cross" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={{ color: "white", marginTop: 10 }}>{text}</Text>
      </View>
    );
  }

}

export default ClosableInfoCard;
