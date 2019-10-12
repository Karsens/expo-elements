import { isToday, isThisWeek, format } from "date-fns";
import * as React from "react";

import { Text, Platform } from "react-native";
const UNREAD_IOS = "#34B7F1";
const UNREAD_ANDROID = "#25D366";

const niceTime = (time, dateTime) => {
  const text = isToday(time)
    ? format(time, "H:mm")
    : isThisWeek(time, { weekStartsOn: 1 })
      ? format(time, "dddd")
      : dateTime
        ? format(time, "DD/MM/YYYY H:mm")
        : format(time, "DD/MM/YYYY");
  return text;
};

const NiceTime = ({ returnString, unread, time, style, dateTime }) => {
  const text = niceTime(time, dateTime);

  const color = unread
    ? Platform.OS === "ios"
      ? UNREAD_IOS
      : UNREAD_ANDROID
    : "#666";

  const styles = style
    ? style
    : { color, fontSize: 10, backgroundColor: "transparent" };

  return returnString ? text : <Text style={styles}>{text}</Text>;
};

export { niceTime, NiceTime };
