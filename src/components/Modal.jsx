import * as React from "react";
import { Modal as M, Portal, FAB, Button, Provider } from "react-native-paper";
import { StyleSheet } from "react-native";
export default function Modal({ children, btns }) {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 5,
    width: "90%",
    marginHorizontal: "auto",
  };

  return (
    <Provider>
      <Portal>
        <M
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          {React.Children.map(children, (child) => {
            return child.props
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    hideModal,
                  },
                })
              : child;
          })}
        </M>
      </Portal>

      <FAB style={styles.fab} small icon="plus" onPress={showModal} />
    </Provider>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
