import React from "react";

// import { Link } from "@react-navigation/web";

import { View, TouchableOpacity, Platform, Text } from "react-native";

type Props = {
  navigation: any,
  routeName: string,
  params: Object,
  title: string,
  children: any
};

import { NavigationActions } from "@react-navigation/core";
import queryString from "query-string";

const getTopNavigation = navigation => {
  const parent = navigation.dangerouslyGetParent();
  if (parent) {
    return getTopNavigation(parent);
  }
  return navigation;
};

class Link extends React.Component {

  render() {
    const {
      children,
      onNavigate,
      params,
      routeName,
      routeKey,
      navigation,
      action
    } = this.props;

    const topNavigation = getTopNavigation(navigation);
    const topRouter = topNavigation.router;
    const navAction =
      action ||
      NavigationActions.navigate({
        routeName,
        key: routeKey,
        params
      });
    if (!action && routeName === undefined && !routeKey) {
      throw new Error(
        "Must provide a routeName, routeKey, or a navigation action prop to <Link>"
      );
    }
    if (action && routeKey) {
      throw new Error(
        "Cannot specify a conflicting \"routeKey\" and a navigation \"action\" prop. Either use routeName with routeKey to specify a navigate action, or provide the specific navigation \"action\" prop."
      );
    }
    if (action && routeName) {
      throw new Error(
        "Cannot specify a conflicting \"routeName\" and a navigation \"action\" prop. Either use routeName with routeKey to specify a navigate action, or provide the specific navigation \"action\" prop."
      );
    }
    const navActionResponse = topRouter.getStateForAction(
      navAction,
      topNavigation.state
    );
    const nextState =
      navActionResponse === null ? topNavigation.state : navActionResponse;
    const pathAndParams = topRouter.getPathAndParamsForState(nextState);
    const href = Object.keys(pathAndParams.params).length
      ? `/${pathAndParams.path}?${queryString.stringify(pathAndParams.params)}`
      : `/${pathAndParams.path}`;
    return (
      <a
        style={{ textDecorationLine: "none" }}
        href={href}
        onClick={e => {
          onNavigate?.(routeName);
          navigation.dispatch(navAction);

          history.pushState(
            {
              id: routeName
            },
            undefined,
            href
          );

          e.preventDefault();
        }}
      >
        {children}
      </a>
    );
  }

}

class NavigationLink extends React.Component<Props> {

  render() {
    const {
      navigation,
      routeName,
      params,
      title,
      children,
      onPress,
      style,
      textStyle,
      onNavigate
    } = this.props;

    const context = children ? (
      children
    ) : (
      <View style={style}>
        <Text
          style={[
            {
              color: "#177ffb",
              textAlign: "center",
              textDecorationLine: "none",
              margin: 8,
              fontSize: 18
            },
            textStyle
          ]}
        >
          {title}
        </Text>
      </View>
    );
    return onPress ? (
      <TouchableOpacity onPress={onPress}>{context}</TouchableOpacity>
    ) : Platform.OS === "web" ? (
      <Link
        onNavigate={onNavigate}
        navigation={navigation}
        routeName={routeName}
        params={params}
      >
        {context}
      </Link>
    ) : (
      <TouchableOpacity
        onPress={() => {
          onNavigate?.(routeName);
          navigation.navigate(routeName, params);
        }}
      >
        {context}
      </TouchableOpacity>
    );
  }

}

export default NavigationLink;
