import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Text, StyleSheet, View, Button, Modal } from "react-native";
import GestureRecognizer from "react-native-swipe-detect";
import useStore from "../../hooks/useStore";
import Icon from "./Icon.jsx";

const ModalSwipe = ({
  children,
  closeOnDown,
  openModal,
  priority,
  topIcon,
}) => {
  const [modal] = useStore("modal");
  const [modalOpen, setModalOpen] = useState(() => modal.getIsOpen ?? false);

  const OpenModal = () => (
    <View>
      {openModal ?? (
        <Button
          title="Open"
          onPress={() => {
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

  const propStyle = { zIndex: priority ?? 10 };
  const { modalWrapper } = styles;
  const combineStyles = StyleSheet.flatten([modalWrapper, propStyle]);

  //   style={[
  //     styles.default,
  //     this.props.singleSourceOfTruth ?
  //     { backgroundColor: 'black' }
  //     : { backgroundColor: 'white' }
  // ]}

  const TopComponent = () => {
    return (
      <View style={{}}>
        {topIcon && (
          <Icon
            source={Icon.sources.arrows.arrowDown}
            style={{ height: 20, width: 20 }}
          />
        )}
        <CloseButton />
      </View>
    );
  };

  const content = (
    <Modal
      animationType="slide"
      presentationStyle="overFullScreen"
      transparent={true}
      visible={modalOpen}
    >
      <View
        style={{
          height: "80vh",
          padding: 40,
          backgroundColor: "#eee",
          marginTop: "auto",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <TopComponent />
        {children}
      </View>
    </Modal>
  );

  const onSwipe = (direction) => {
    console.log("direction", direction);
    closeOnDown && direction === "SWIPE_DOWN" ? setModalOpen(false) : null;
  };

  return (
    <GestureRecognizer
      onSwipe={(direction) => {
        console.log("asdasd");
        onSwipe(direction);
      }}
    >
      {modalOpen ? content : <OpenModal />}
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    padding: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    boxShadow: "-2px -16px 36px -4px rgba(34, 60, 80, 0.13)",
    width: "100%",
    margin: "0 auto",
    height: "auto",
    minHeight: "450px",
    top: 0,
  },
});

export default observer(ModalSwipe);
