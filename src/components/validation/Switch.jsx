import * as React from "react";
import { Switch as S } from "react-native-paper";

const Switch = (onChange) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    onChange(isSwitchOn);
  };

  return <S value={isSwitchOn} onValueChange={onToggleSwitch} />;
};
export default Switch;
