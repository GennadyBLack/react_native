import * as React from "react";
import { Switch as S } from "react-native-paper";
import { Text } from "react-native";

const Switch = ({ onChange, value, initVal = false, label }) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(() => {
    if (value && typeof value == "boolean") {
      return value;
    } else if (!value && initVal) {
      return initVal;
    } else {
      return false;
    }
  });

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    typeof onChange == "function" ? onChange(!isSwitchOn) : null;
  };

  return (
    <>
      {label && <Text>{label}</Text>}
      <S value={isSwitchOn} onValueChange={onToggleSwitch} />
    </>
  );
};

export default Switch;
