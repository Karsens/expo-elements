import React from "react";
import { Platform, ScrollView, KeyboardAvoidingView, View } from "react-native";

export type Props = {
  noNavigationBelow: boolean,
  footer: React.ReactElement,
  backgroundColor?: string
};

/**
 * KAS = KeyboardAvoidingScrollView
 */

export class Component extends React.Component<Props> {

  static defaultProps = {
    isScrollView: true
  };

  render() {
    const {
      isScrollView,
      noNavigationBelow,
      footer,
      children,
      backgroundColor
    } = this.props;

    const offsetAdded = noNavigationBelow && Platform.OS === "ios" ? 50 : 0;
    const defaultOffset = Platform.OS === "ios" ? 20 : 75;
    const totalOffset = defaultOffset + offsetAdded;

    const ScrollViewOrView = isScrollView ? ScrollView : View;
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: "#DDD"
        }}
        behavior="padding"
        keyboardVerticalOffset={totalOffset}
      >
        <ScrollViewOrView
          keyboardShouldPersistTaps={"handled"}
          style={{
            flex: 1,
            backgroundColor
          }}
        >
          {children}
        </ScrollViewOrView>
        {footer}
      </KeyboardAvoidingView>
    );
  }

}
