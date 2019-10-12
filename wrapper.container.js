import {
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Alert,
  View
} from "react-native";
import React from "react";
// import { Constants } from 'expo';

type Props = {
  keyboard?: boolean,
  skipPixels?: number,
  scroll?: boolean,
  center?: boolean,
  padding?: boolean,
  onRefresh?: () => any
};

//this container can be included in any screen to include background, default styles, optional scrollview, optional keyboard avoiding view, etc
export default class Container extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  componentDidMount() {
    if (this.props.skipPixels) {
      this.scrollview.scrollTo({ x: 0, y: this.props.skipPixels });
    }

    if (this.props.reference && this.scrollview) {
      this.props.reference(this.scrollview);
    }
  }

  render() {
    let center = this.props.children;

    if (this.props.scroll) {
      center = (
        <ScrollView
          keyboardShouldPersistTaps={"handled"}
          style={{
            flex: 1
          }}
          // contentOffset={{ x: 0, y: 200 }} not needed cuz only works on iOS
          ref={ref => (this.scrollview = ref)}
          refreshControl={
            this.props.onRefresh ? (
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => {
                  this.setState({ refreshing: true });
                  this.props
                    .onRefresh()
                    .then(() => {
                      this.setState({ refreshing: false });
                      Alert.alert("refreshed");
                    })
                    .catch(e => console.log(e));
                }}
              />
            ) : (
              undefined
            )
          }
        >
          {center}
        </ScrollView>
      );
    }

    if (this.props.keyboard) {
      center = (
        <KeyboardAvoidingView
          style={{
            flex: 1,
            justifyContent: "space-between"
          }}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
        >
          {center}
        </KeyboardAvoidingView>
      );
    }

    return <View style={{ flex: 1, backgroundColor: "#FFF" }}>{center}</View>;
  }

}
