import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Text, StyleSheet, View, Button } from "react-native";
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
      <View style={{ display: "flex", alignItems: "center" }}>
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
    <View style={combineStyles}>
      <TopComponent />

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
    padding: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    boxShadow: "-2px -16px 36px -4px rgba(34, 60, 80, 0.13)",
    width: "100%",
    margin: "0 auto",
    height: "auto",
    minHeight: "450px",
    backgroundColor: "rgb(202 198 198)",
  },
});

export default observer(ModalSwipe);
