import React from "react";

import { View, Share, Text, TouchableOpacity } from "react-native";
import { Config } from "../config";

class Fact extends React.Component<{
  color: String,
  shareable: Boolean,
  refreshable: boolean
}> {

  onShare = async message => {
    try {
      const result = await Share.share({
        message
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const { color, shareable, refreshable } = this.props;

    const facts = Config.statements?.length;
    const fact =
      facts && Config.statements?.[Math.floor(facts * Math.random())];

    return fact ? (
      <TouchableOpacity
        onPress={() =>
          shareable
            ? this.onShare(fact)
            : refreshable
              ? this.setState({ clicked: Math.random() })
              : null
        }
      >
        <Text style={{ color }}>{fact}</Text>
      </TouchableOpacity>
    ) : (
      <View />
    );
  }

}

export default Fact;
