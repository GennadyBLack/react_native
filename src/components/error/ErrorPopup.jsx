import * as React from "react";
import { View } from "react-native";
import { Snackbar } from "react-native-paper";

const ErrorPopup = ({ text, onDelete }) => {
  const [visible, setVisible] = React.useState(true);
  const onDismissSnackBar = () => {
    setVisible(false), onDelete();
  };

  return (
    <View style={{ height: 0, width: 350 }}>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Undo",
          onPress: () => {},
        }}
      >
        {text}
      </Snackbar>
    </View>
  );
};

export default ErrorPopup;
