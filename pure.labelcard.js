import React from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { appendIfBase64 } from "../expo-inputs/utils";
import * as Icon from "@expo/vector-icons";

const { FontAwesome } = Icon;
const getLabelPosition = (
  index: number,
  labelSize: number,
  imageSize: number
): { left: number, top: number } => {
  const RAD = 0.0174532925;
  const position = index - 2;
  const degrees = 30;
  const radius = imageSize / 2;
  const x =
    Math.round(radius * Math.cos(position * degrees * RAD) + radius) -
    labelSize / 2;
  const y =
    Math.round(radius * Math.sin(position * degrees * RAD) + radius) -
    labelSize / 2;

  return {
    left: x,
    top: y
  };
};

export type Label = {
  index: number,
  emojiOrLetter?: string,
  icon?: string,
  iconFamily?: string,
  backgroundColor?: string,
  size?: number
};

type Base64Image = {
  base64: string,
  width: number,
  height: number
};

type AbsoluteLabelProps = {
  index: number,
  label: Label,
  imageSize: number
};

type RawLabelCardProps = {
  /**
   * if given, renders children instead of title
   */
  children: React.ReactNode,
  imageSize: number,
  isEditing: boolean,
  isSelected: boolean,
  labels: Label[],
  title: string,
  image: Base64Image
};

export type LabelCardProps = RawLabelCardProps & {
  cardSize: number, //#toClean not used?
  backgroundColor: string,
  footer: React.Component,
  subtitle: string
};

class AbsoluteLabel extends React.PureComponent<AbsoluteLabelProps> {

  render() {
    const { index, label, imageSize } = this.props;
    const DEFAULT_SIZE = 25;
    const labelSize = label?.size || DEFAULT_SIZE;

    return (
      <View
        key={`label-${label.index}`}
        style={{
          position: "absolute",
          ...getLabelPosition(index, labelSize, imageSize),
          width: labelSize,
          height: labelSize,
          borderRadius: labelSize / 2,
          backgroundColor: label.backgroundColor,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{ color: "white" }}>{label.emojiOrLetter}</Text>
      </View>
    );
  }

}

class RawLabelCard extends React.PureComponent<RawLabelCardProps> {

  renderImageOverName(image: Base64Image, imageSize: number) {
    return (
      image && (
        <Image
          source={{
            uri: appendIfBase64(image),
            cache: "force-cache"
          }}
          style={{
            position: "absolute",
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize / 2
          }}
        />
      )
    );
  }

  renderSelected(isEditing: boolean, isSelected: boolean, imageSize: number) {
    return (
      isEditing &&
      isSelected && (
        <View
          style={{
            position: "absolute",
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize / 2,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <FontAwesome name="check" size={imageSize / 2} color="white" />
        </View>
      )
    );
  }

  renderLabelsOverCard(labels, imageSize) {
    return labels.map(
      (label: Label, index) =>
        label && (
          <AbsoluteLabel
            key={`label-${label.index}`}
            index={index}
            label={label}
            imageSize={imageSize}
          />
        )
    );
  }

  renderTitle(title) {
    /**
     * #todo make dependent on fontScale afer it's in device (see `index.js`)
     * fontScale > 2 ? 2 : fontscale > 1.4 ? 3 : 4
     *  */
    const numberOfLines = 4;

    return (
      <Text
        ellipsizeMode="tail"
        numberOfLines={numberOfLines}
        style={{ color: "white" }}
      >
        {title}
      </Text>
    );
  }

  render() {
    const {
      title,
      image,
      labels,
      imageSize,
      children,
      isEditing,
      isSelected
    } = this.props;

    const textWidth = imageSize * 0.75;

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: imageSize
          // flex: 1
        }}
      >
        <View
          style={{
            width: textWidth,
            alignItems: "center"
          }}
        >
          {children ? children : this.renderTitle(title)}
        </View>

        {this.renderImageOverName(image, imageSize)}

        {this.renderLabelsOverCard(labels, imageSize)}

        {this.renderSelected(isEditing, isSelected, imageSize)}
      </View>
    );
  }

}

/**
 * Responsibility: Render labelcard with any size, labels, text, footer, bgcolor, picture, health
 * Image: `./pure.labelcard.png`
 * Type: pure, stateless, dumb, performs unknown action. This is pure UI/UX, it gets the action it's supposed to perform.
 *
 * Todo:
 * - [ ] Create health bar `pure.health.bar.js` that turns red (score 1) to green (score 10)
 */

export class LabelCard extends React.Component<LabelCardProps> {

  render() {
    const {
      backgroundColor,
      borderStyle,
      isEditing,
      isSelected,
      cardSize,
      children,
      footer,
      image,
      imageSize,
      labels,
      subtitle,
      title
    } = this.props;

    return (
      <View
        style={{
          margin: 10,
          width: cardSize,
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <View
          style={[
            {
              width: imageSize,
              height: imageSize,
              borderRadius: imageSize / 2,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor
            },
            borderStyle
          ]}
        >
          <RawLabelCard
            isEditing={isEditing}
            isSelected={isSelected}
            labels={labels}
            imageSize={imageSize}
            title={title}
            image={image}
          >
            {children}
          </RawLabelCard>
        </View>
        {footer}
      </View>
    );
  }

}
