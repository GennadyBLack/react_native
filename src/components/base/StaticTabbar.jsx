import react from "react";
import { View, Text, Dimensions, Pressable, Button } from "react-native";
import { getIcon } from "../../helpers/iconHelper";
const { width } = Dimensions.get("window");

const StaticTabbar = ({ tabs, value, scrollTo }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      {tabs ? (
        tabs.map((item, idx) => {
          return (
            <Pressable
              key={idx}
              onPress={(e) => {
                scrollTo(e.screenX);
              }}
            >
              <Text>{getIcon(item?.icon)}</Text>
            </Pressable>
          );
        })
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

export default StaticTabbar;
