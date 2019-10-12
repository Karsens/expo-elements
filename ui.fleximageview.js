// External
import React from "react";
import {
  View,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";

import { isIphoneX } from "react-native-iphone-x-helper";

// LECKR
import { Config } from "../config";
export type Props = {
  children: any,

  /**
   * on pressing the background, do something
   */
  onPress: () => void,

  /**
   * image to be rendered with flex size dependent on rest of content
   */
  image: ImageBitmap
};

/**
 *
 * only works without navigation because of KAV
 * renders a fullscreen thing that nicely adapts view when keyboard opens
 *
 */
export class Component extends React.Component<Props> {

  renderImage(image) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {image && (
          <Image
            source={image}
            style={{ flex: 1, maxWidth: 200 }}
            resizeMode="contain"
          />
        )}
      </View>
    );
  }

  render() {
    const { onPress, image, style, children } = this.props;

    const TouchOrView = onPress ? TouchableWithoutFeedback : View;

    const backgroundColor = Config.layouts?.[0]?.colors?.primary;

    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor
        }}
        behavior="padding"
      >
        <StatusBar hidden />
        <TouchOrView style={{ flex: 1 }} onPress={onPress}>
          <View
            style={[
              {
                flex: 1,
                justifyContent: "center",
                padding: 16,
                paddingBottom: isIphoneX() ? 50 : undefined
              },
              style
            ]}
          >
            {/* flex */}
            {image && this.renderImage(image)}

            {/* no flex */}
            {children}
          </View>
        </TouchOrView>
      </KeyboardAvoidingView>
    );
  }

}
