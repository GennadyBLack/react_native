import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export const getIcon = (name, ...props) => {
  switch (name) {
    case "rightcircle":
      return <AntDesign name="rightcircle" size={24} color="black" />;
    case "leftcircle":
      return <AntDesign name="leftcircle" size={24} color="black" />;
    case "upcircle":
      return <AntDesign name="upcircle" size={24} color="black" />;
    case "downcircle":
      <AntDesign name="downcircle" size={24} color="black" />;
    case "rightcircleo":
      return <AntDesign name="rightcircleo" size={24} color="black" />;
    case "upcircleo":
      return <AntDesign name="upcircleo" size={24} color="black" />;
    case "leftcircleo":
      return <AntDesign name="leftcircleo" size={24} color="black" />;
    case "downcircleo":
      return <AntDesign name="downcircleo" size={24} color="black" />;
    case "retweet":
      return <AntDesign name="retweet" size={24} color="black" />;
    case "down":
      return <AntDesign name="down" size={24} color="black" />;
    case "up":
      return <AntDesign name="up" size={24} color="black" />;
    case "right":
      return <AntDesign name="right" size={24} color="black" />;
    case "left":
      return <AntDesign name="left" size={24} color="black" />;
    case "minuscircleo":
      return <AntDesign name="minuscircleo" size={24} color="black" />;
    case "pluscircleo":
      return <AntDesign name="pluscircleo" size={24} color="black" />;
    case "closecircleo":
      return <AntDesign name="closecircleo" size={24} color="black" />;
    case "closecircle":
      return <AntDesign name="closecircle" size={24} color="black" />;
    case "checkcircle":
      return <AntDesign name="checkcircle" size={24} color="black" />;
    case "checkcircleo":
      return <AntDesign name="checkcircleo" size={24} color="black" />;
    case "close":
      return <AntDesign name="close" size={24} color="black" />;
    case "link":
      return <AntDesign name="link" size={24} color="black" />;
    case "home":
      return <AntDesign name="home" size={24} color="black" />;
    case "filter":
      return <AntDesign name="filter" size={24} color="black" />;
    case "user":
      return <AntDesign name="user" size={24} color="black" />;
    case "setting":
      return <AntDesign name="setting" size={24} color="black" />;
    case "notification":
      return <AntDesign name="notification" size={24} color="black" />;
    case "delete":
      return <AntDesign name="delete" size={24} color="black" />;
    case "heart":
      return <AntDesign name="heart" size={24} color="black" />;
    case "hearto":
      return <AntDesign name="hearto" size={24} color="black" />;
    case "search1":
      return <AntDesign name="search1" size={24} color="black" />;
    case "sync":
      return <AntDesign name="sync" size={24} color="black" />;
    case "message1":
      return <AntDesign name="message1" size={24} color="black" />;
    case "dots-three-vertical":
      return <Entypo name="dots-three-vertical" size={24} color="black" />;
    case "dots-three-horizontal":
      return <Entypo name="dots-three-horizontal" size={24} color="black" />;
    case "fingerprint":
      return <Entypo name="fingerprint" size={24} color="black" />;
    case "forward":
      return <Entypo name="forward" size={24} color="black" />;
    case "list":
      return <Entypo name="list" size={24} color="black" />;
    case "message":
      return <Entypo name="message" size={24} color="black" />;
    case "question":
      return <AntDesign name="question" size={24} color="black" />;
    default:
      return <Entypo name="message" size={24} color="black" />;
  }
};
