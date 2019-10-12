/*to use:
<ParallaxView
          backgroundSource={avatar ? { uri: avatar } : undefined}
          backgroundColor={backgroundColor}
          windowHeight={300}
          scrollableViewStyle={{
            flex: 1,
            backgroundColor,
            paddingBottom: 20,
            paddingLeft: 10
          }}
        >*/
import React from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  Animated
} from "react-native";
/**
 * BlurView temporarily removed until semver stuff is set up properly
 */

//var BlurView /* = require('react-native-blur').BlurView */;

var screen = Dimensions.get("window");
// var ScrollViewPropTypes = ScrollView.propTypes;

class ParallaxView extends React.Component {

  /*propTypes: {
        ...ScrollViewPropTypes,
        windowHeight: React.PropTypes.number,
        backgroundSource: React.PropTypes.oneOfType([
          React.PropTypes.shape({
            uri: React.PropTypes.string,
          }),
          // Opaque type returned by require('./image.jpg')
          React.PropTypes.number,
        ]),
        header: React.PropTypes.node,
        blur: React.PropTypes.string,
        contentInset: React.PropTypes.object,
    },*/

  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0)
    };
  }

  /**
   * IMPORTANT: You must return the scroll responder of the underlying
   * scrollable component from getScrollResponder() when using ScrollableMixin.
   */
  getScrollResponder() {
    return this._scrollView.getScrollResponder();
  }

  setNativeProps(props) {
    this._scrollView.setNativeProps(props);
  }

  renderBackground = function() {
    var { windowHeight, backgroundSource, blur, backgroundColor } = this.props;
    var { scrollY } = this.state;
    if (!windowHeight || !backgroundSource) {
      return null;
    }

    const backgroundStyle = {
      position: "absolute",
      backgroundColor: backgroundColor || "#2e2f31",
      width: screen.width,
      resizeMode: "cover"
    };

    return (
      <Animated.Image
        style={[
          backgroundStyle,
          {
            height: windowHeight,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-windowHeight, 0, windowHeight],
                  outputRange: [windowHeight / 2, 0, -windowHeight / 3]
                })
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-windowHeight, 0, windowHeight],
                  outputRange: [2, 1, 1]
                })
              }
            ]
          }
        ]}
        source={backgroundSource}
      >
        {/*
                    !!blur && (BlurView || (BlurView = require('react-native-blur').BlurView)) &&
                    <BlurView blurType={blur} style={styles.blur} />
                */}
      </Animated.Image>
    );
  };

  renderHeader = function() {
    var { windowHeight, backgroundSource } = this.props;
    var { scrollY } = this.state;
    if (!windowHeight || !backgroundSource) {
      return null;
    }
    return (
      <Animated.View
        style={{
          position: "relative",
          height: windowHeight,
          opacity: scrollY.interpolate({
            inputRange: [-windowHeight, 0, windowHeight / 1.2],
            outputRange: [1, 1, 0]
          })
        }}
      >
        {this.props.header}
      </Animated.View>
    );
  };

  render = function() {
    var { style, ...props } = this.props;
    return (
      <View style={[styles.container, style]}>
        {this.renderBackground()}
        <ScrollView
          ref={component => {
            this._scrollView = component;
          }}
          {...props}
          style={styles.scrollView}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
          ])}
          scrollEventThrottle={16}
        >
          {this.renderHeader()}
          <View style={[styles.content, props.scrollableViewStyle]}>
            {this.props.children}
          </View>
        </ScrollView>
      </View>
    );
  };

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "transparent"
  },
  scrollView: {
    backgroundColor: "transparent"
  },
  blur: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "transparent"
  },
  content: {
    shadowColor: "#222",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column"
  }
});

ParallaxView.defaultProps = {
  windowHeight: 300,
  contentInset: {
    top: screen.scale
  }
};

export default ParallaxView;
