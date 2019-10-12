import React from "react";
import { View, Image } from "react-native";
import { withNavigation } from "react-navigation";
import * as Icon from "@expo/vector-icons";
import { Platform } from "@unimodules/core";
import { Config } from "../config";
import NavigationLink from "./navigation.link";

const headerHeight = Platform.OS === "web" ? 0 : 20;
type Navigation = any;

export type Props = {
  navigation: Navigation,
  back: boolean
};

export class SimpleHeader extends React.Component<Props> {
  renderItem(screen, icon, IconFamily = Icon.Feather) {
    const { navigation } = this.props;

    return (
      <NavigationLink navigation={navigation} routeName={screen}>
        <IconFamily
          name={icon}
          size={30}
          color={Config.layouts?.[0]?.colors?.defaultText}
        />
      </NavigationLink>
    );
  }

  render() {
    const { back, more, settings, navigation } = this.props;
    return (
      <View
        style={{
          padding: 20,
          paddingTop: 20 + headerHeight,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: Config.layouts?.[0]?.colors?.primary
        }}
      >
        {Platform.OS === "web" ? (
          <NavigationLink navigation={navigation} routeName="Home">
            <Image
              source={require("../apps/_current/assets/_current/logo200.png")}
              style={{ width: 60, height: 60 }}
            />
          </NavigationLink>
        ) : (
          undefined
        )}
        {Platform.OS === "web" ? (
          undefined
        ) : (
          <View>{back ? this.renderItem("Home", "home") : undefined}</View>
        )}

        {Platform.OS === "web" ? (
          undefined
        ) : (
          <View
            style={{
              flexDirection: "row",
              height: 40,
              justifyContent: "flex-end"
            }}
          >
            {settings && this.renderItem(settings, "settings")}
            {this.renderItem(more || "More", "more-vertical")}
          </View>
        )}
      </View>
    );
  }
}

export default withNavigation(SimpleHeader);
