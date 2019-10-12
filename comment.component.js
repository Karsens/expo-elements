import * as React from "react";
import { TouchableOpacity, View, Text, Clipboard } from "react-native";
import ModalSelector from "react-native-modal-selector";

import { C, NiceTime, Touchable, SuperImage } from "../index.leckr.imports";
import { FontAwesome } from "@expo/vector-icons";

const Comment = ({ likePost, comment, channelid, goToProfile }) => {
  const SIZE = 40;
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 4,
        width: "100%"
      }}
    >
      <TouchableOpacity
        onPress={() => goToProfile(comment.userid, comment.user)}
      >
        {comment.avatar ? (
          <SuperImage
            source={{ uri: comment.avatar }}
            style={{ width: SIZE, height: SIZE, borderRadius: SIZE / 2 }}
          />
        ) : (
          <View
            style={{
              backgroundColor: "#CCC",
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE / 2
            }}
          />
        )}
      </TouchableOpacity>
      <View style={{ width: "100%" }}>
        <Touchable onLongPress={() => this.modal.open()}>
          <View
            style={{
              backgroundColor: "#EEE",
              borderRadius: 20,
              width: "80%",
              marginHorizontal: 8,
              paddingLeft: 8,
              paddingRight: 4,
              paddingTop: 5,
              paddingBottom: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                width: "90%"
              }}
            >
              <TouchableOpacity
                onPress={() => goToProfile(comment.userid, comment.user)}
              >
                <Text
                  style={{
                    paddingRight: 5,
                    fontWeight: "bold",
                    color: "darkblue"
                  }}
                >
                  {comment.user}
                </Text>
              </TouchableOpacity>
              <Text style={{ marginVertical: 0 }}>
                <Text>{comment.text}</Text>
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                bottom: -10,
                right: -10,
                backgroundColor: "white",
                borderRadius: 10,
                shadowColor: "#CCC",
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 1,
                shadowRadius: 1,
                elevation: 3,
                justifyContent: "center",
                alignItems: "center",
                padding: 1,
                paddingRight: 5
              }}
            >
              <View
                style={{
                  backgroundColor: C.LIKE_COLOR,
                  borderRadius: 7,
                  width: 14,
                  height: 14,
                  marginRight: 3,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <FontAwesome color="white" name="thumbs-up" size={10} />
              </View>
              <Text>{comment.likes}</Text>
            </View>
          </View>
        </Touchable>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 15
          }}
        >
          <NiceTime time={comment.createdAt} />
          <TouchableOpacity
            style={{ marginLeft: 5 }}
            onPress={() => {
              likePost({ id: comment.id, channelId: channelid });
            }}
          >
            <Text style={{ marginRight: 4 }}>Like</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalSelector
        ref={element => (this.modal = element)}
        data={[
          {
            key: 1,
            label: "Copy",
            action: () => Clipboard.setString(comment.text)
          }
        ]}
        animationType="fade"
        onChange={option => option.action(option)}
        backdropPressToClose={true}
      >
        <View />
      </ModalSelector>
    </View>
  );
};

export { Comment };
