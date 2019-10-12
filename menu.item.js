import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as Icon from "@expo/vector-icons";

const defaultIconComponent = Icon.Entypo;
const ICON_MARGIN = 15;
const ICON_SIZE = 18;

export type Item = {
  title: string,
  /**
   * default Entypo
   */
  icon: string,
  onPress?: () => void,
  iconComponent: any,
  iconFamily: string
};

export type MenuItemProps = {
  onPress: () => null,
  index: number,
  item: Item
};

export class MenuItem extends React.Component<MenuItemProps> {

  render() {
    const { onPress, index, item } = this.props;

    const IconComponent = item.iconComponent
      ? item.iconComponent
      : item.iconFamily
        ? Icon[item.iconFamily]
        : defaultIconComponent;

    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          paddingHorizontal: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          height: 45,
          alignItems: "center"
        }}
        key={`i-${index}`}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: ICON_SIZE + ICON_MARGIN * 2 }}>
            <IconComponent
              name={item.icon}
              size={ICON_SIZE}
              style={{ marginHorizontal: ICON_MARGIN }}
            />
          </View>
          <Text>{item.title}</Text>
        </View>

        <View style={{ marginRight: 10 }}>
          <Icon.Ionicons name="ios-arrow-forward" size={ICON_SIZE} />
        </View>
      </TouchableOpacity>
    );
  }

}
