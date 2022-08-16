import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Text, StyleSheet, View, Button } from "react-native";
import GestureRecognizer from "react-native-swipe-detect";
import useStore from "../../hooks/useStore";

const ModalSwipe = ({ children, closeOnDown, openModal }) => {
  const [modal] = useStore("modal");
  const [modalOpen, setModalOpen] = useState(() => modal.getIsOpen ?? false);

  const OpenModal = () => (
    <View>
      {openModal ?? (
        <Button
          title="Open"
          onPress={() => {
            console.log("close");
            setModalOpen(true);
          }}
        ></Button>
      )}
    </View>
  );

  const CloseButton = () => {
    return (
      !closeOnDown && (
        <Button
          title="close"
          onPress={() => {
            setModalOpen(false);
          }}
        ></Button>
      )
    );
  };

  const content = (
    <View style={styles.modalWrapper}>
      <CloseButton />
      {children}
    </View>
  );

  const onSwipe = (direction) => {
    closeOnDown && direction === "SWIPE_DOWN" ? setModalOpen(false) : null;
  };
  return (
    <GestureRecognizer onSwipe={(direction) => onSwipe(direction)}>
      {modalOpen ? content : <OpenModal />}
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    width: "100%",
    margin: "0 auto",
    height: "auto",
    minHeight: "450px",
    backgroundColor: "red",
  },
});

export default observer(ModalSwipe);
