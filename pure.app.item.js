import React from "react";

import { View, Image, Text } from "react-native";
import * as Icon from "@expo/vector-icons";
import NavigationLink from "./navigation.link";

export type Props = {
  style?: Object,
  nof: number,
  name: string,
  source: ImageBitmap,
  id: number,
  color: string,
  onPress: () => void,
  icon?: string,
  iconFamily?: string,
  navigation?: any,
  params?: Object,
  routeName: string
};
const MARGIN = 8;
const SIZE = 60;

const colors = "#1abc9c, #f1c40f, #f39c12, #2ecc71, #27ae60, #27ae60, #e67e22, #3498db, #2980b9, #e74c3c, #c0392b, #9b59b6, #9b59b6, #bdc3c7, #34495e, #2c3e50, #2c3e50, #7f8c8d".split(
  ", "
);
const pickColor = id => colors[id % colors.length];

const firstLetters = (text, letters) =>
  text
    ?.split(" ")
    .map(word => word.substring(0, 1))
    .join("")
    .substring(0, letters || 2);

const AppItem = ({
  style,
  nof,
  name,
  source,
  id,
  color,
  onPress,
  icon,
  iconFamily,
  navigation,
  routeName,
  params
}: Props) => {
  const TheIcon = Icon[iconFamily || "FontAwesome"];

  return (
    <NavigationLink
      navigation={navigation}
      routeName={routeName}
      params={params}
      onPress={onPress}
    >
      <View
        style={[
          {
            width: SIZE,
            marginTop: MARGIN
          },
          {
            width: SIZE + MARGIN * 2,
            alignItems: "center"
          },
          style
        ]}
      >
        <View
          style={{
            backgroundColor: color ? color : pickColor(id),
            width: SIZE,
            height: SIZE,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 12,
            marginTop: MARGIN
          }}
        >
          {source ? (
            <Image
              source={source}
              style={{ width: SIZE, height: SIZE, borderRadius: 12 }}
            />
          ) : icon ? (
            <TheIcon name={icon} size={36} color="white" />
          ) : (
            <Text style={{ fontSize: 25 }}>{firstLetters(name, 1)}</Text>
          )}
        </View>

        {nof > 0 ? (
          <View
            style={{
              position: "absolute",
              zIndex: 1,
              right: 0,
              top: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
              width: 20,
              height: 20,
              borderRadius: 10
            }}
          >
            <Text style={{ color: "white" }}>{nof}</Text>
          </View>
        ) : null}

        <Text style={{ textAlign: "center", fontSize: 12 }} numberOfLines={3}>
          {name}
        </Text>
      </View>
    </NavigationLink>
  );
};

export default AppItem;
