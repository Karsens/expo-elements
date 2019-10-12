import * as React from "react";
//https://github.com/apollographql/eslint-plugin-graphql
import { Platform, View, Text } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

import {
  Touchable,
  getColorByBgColor,
  CorrectStatusBar
} from "../index.leckr.imports";
const hitSlop = 30;
const HEIGHT = 55;

class CustomHeader extends React.Component {

  constructor(props) {
    super(props);
    this.OptionButton = this.OptionButton.bind(this);
  }

  OptionButton() {
    const { onRightPress } = this.props;

    return onRightPress ? (
      <Touchable
        hitSlop={{
          top: hitSlop,
          bottom: hitSlop,
          left: hitSlop,
          right: hitSlop
        }}
        onPress={() => this.modalSelector.open()}
      >
        <ModalSelector
          ref={ref => (this.modalSelector = ref)}
          data={onRightPress}
          animationType="fade"
          onChange={option => option.action()}
          backdropPressToClose={true}
        >
          <Ionicons
            name={Platform.OS === "ios" ? "ios-more" : "md-more"}
            size={25}
            color="black"
          />
        </ModalSelector>
      </Touchable>
    ) : null;
  }

  render() {
    const {
      backButtonAmount,
      title,
      subtitle,
      onBackPress,
      bgcolor,
      onTitlePress,
      icon
    } = this.props;
    const { OptionButton } = this;

    const backgroundColor = bgcolor ? bgcolor : "#CCC";
    return (
      <View>
        <CorrectStatusBar backgroundColor={backgroundColor} />

        <View
          style={{
            height: HEIGHT,
            borderBottomColor: "#CCC",
            borderBottomWidth: 1,
            marginTop: Platform.OS !== "ios" ? Constants.statusBarHeight : 0,
            backgroundColor,
            flexDirection: "row"
          }}
        >
          <View
            style={{
              flex: 5,
              alignItems: "center"
            }}
          >
            <Touchable
              hitSlop={{
                top: hitSlop,
                bottom: hitSlop,
                left: hitSlop,
                right: hitSlop
              }}
              onPress={onBackPress}
              style={{ flex: 1, justifyContent: "center", zIndex: 99 }}
              background={Touchable.Ripple("#404040")}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name={
                    Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"
                  }
                  size={25}
                  color={backButtonAmount ? "#34B7F1" : "black"}
                />
                {backButtonAmount ? (
                  <View style={{ marginLeft: 5 }}>
                    <Text style={{ fontSize: 15, color: "#34B7F1" }}>
                      {backButtonAmount}
                    </Text>
                  </View>
                ) : (
                  undefined
                )}
              </View>
            </Touchable>
          </View>

          <View style={{ flex: 35 }}>
            <Touchable
              onPress={onTitlePress}
              style={{ flex: 1 }}
              background={Touchable.Ripple("#404040")}
            >
              <View style={{ flexDirection: "row", height: HEIGHT }}>
                {icon ? (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {icon}
                  </View>
                ) : (
                  undefined
                )}

                <View
                  style={{
                    flex: 30,
                    paddingHorizontal: 10,
                    paddingTop: 10
                  }}
                >
                  <Text
                    numberOfLines={subtitle ? 1 : 2}
                    style={{
                      color: getColorByBgColor(bgcolor),
                      fontWeight: "bold",
                      fontSize: 18
                    }}
                  >
                    {title ? title : "No title given"}
                  </Text>
                  {subtitle ? (
                    <Text
                      numberOfLines={1}
                      style={{ color: getColorByBgColor(bgcolor) }}
                    >
                      {subtitle}
                    </Text>
                  ) : (
                    undefined
                  )}
                </View>
              </View>
            </Touchable>
          </View>

          <View
            style={{
              flex: 4,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <OptionButton />
          </View>
        </View>
      </View>
    );
  }

}
export default CustomHeader;
