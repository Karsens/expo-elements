import React from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import * as Icon from "@expo/vector-icons";
import { appendIfBase64 } from "../expo-inputs/utils";

const { Ionicons } = Icon;

type ImageType = any;

export type ListItemProps = {
  /**
   * children can be any icons at the right
   */
  children: undefined,
  isEditing: boolean,
  isSelected: boolean,
  image: ImageType,
  title: string,
  subtitle: string
};

/**
 * Responsibility: Render list-item with any title, subtitle, image, editingstate (animation), selectedstate
 * Image: `./pure.listitem.png` #todo add picture
 * Type: pure, stateless, dumb, performs unknown action. This is pure UI/UX, it gets the action it's supposed to perform.
 *
 * #todo:
 * - [ ] Edit checkbox icon, no box, just colored checkmark.
 * - [ ] Add animation when isEditing is changing, items should go to the left a bit.
 */

class ListItem extends React.Component<ListItemProps> {

  renderCheckBox = (isEditing, already) => {
    return isEditing ? (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {already ? (
          <View style={{ width: 20, height: 20 }}>
            <Ionicons size={20} name={"md-checkmark"} color="#177ffb" />
          </View>
        ) : (
          <View style={{ width: 20, height: 20 }} />
        )}
      </View>
    ) : null;
  };

  renderSeparator() {
    return (
      <View
        style={{ marginHorizontal: 10, height: 1, backgroundColor: "#CCC" }}
      />
    );
  }

  renderImage(image, title) {
    const getLetters = word => word.substring(0, 1);
    const initials = title
      ?.split(" ")
      .map(getLetters)
      .join("")
      .substring(0, 2);

    const imageStyle = {
      width: 40,
      height: 40,
      borderRadius: 40 / 2
    };

    return image ? (
      <Image
        source={{
          uri: appendIfBase64(image),
          cache: "force-cache"
        }}
        style={imageStyle}
      />
    ) : (
      <View
        style={[
          imageStyle,
          {
            backgroundColor: "#CCC",
            justifyContent: "center",
            alignItems: "center"
          }
        ]}
      >
        <Text style={{ fontSize: 18 }}>{initials}</Text>
      </View>
    );
  }

  render() {
    const {
      isEditing,
      isSelected,
      image,
      title,
      subtitle,
      children //#toremember this is useful to see that the component has no children
    } = this.props;

    const abbrv = str => (str.length > 30 ? str.substring(0, 28) + ".." : str);
    return (
      <View>
        <View
          style={{
            minHeight: 50,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 10
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {this.renderCheckBox(isEditing, isSelected)}
            {this.renderImage(image, title)}
            <View style={{ justifyContent: "center", marginLeft: 16 }}>
              {title && (
                <Text numberOfLines={1} style={{ fontSize: 16 }}>
                  {abbrv(title)}
                </Text>
              )}

              {subtitle && <Text numberOfLines={1}>{subtitle}</Text>}
            </View>
            {children}
          </View>
        </View>

        {this.renderSeparator()}
      </View>
    );
  }

}

export default ListItem;
