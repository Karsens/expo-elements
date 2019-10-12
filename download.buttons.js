import React from "react";
import { View, TouchableOpacity, Image } from "react-native";

import { Linking, Platform } from "react-native";

import { Config } from "../config";
const googleUrl = Config.googleUrl;
const iosUrl = Config.iosUrl;

const DownloadButtons = () =>
  Platform.OS === "web" ? (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "flex-start"
      }}
    >
      <TouchableOpacity onPress={() => Linking.openURL(googleUrl)}>
        <Image
          style={{ margin: 10, width: 240, height: 80, borderRadius: 10 }}
          source={require("../assets/google-play-badge.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Linking.openURL(iosUrl)}>
        <Image
          style={{ margin: 10, width: 240, height: 80, borderRadius: 10 }}
          source={require("../assets/app-store-badge.png")}
        />
      </TouchableOpacity>
    </View>
  ) : (
    <View />
  );

export default DownloadButtons;
