import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Menu, Provider } from "react-native-paper";

const MenuToggler = ({ items, anchor }) => {
  const [visible, setVisible] = useState(true);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const toggleButton = () => {
    return anchor ? (
      <Button onPress={openMenu}>{anchor}</Button>
    ) : (
      <Button onPress={openMenu}>Show menu</Button>
    );
  };

  if (!items.length) {
    return <div>no</div>;
  }
  return (
    <Provider>
      <View className="menu-toggler">
        <Menu visible={visible} onDismiss={closeMenu} anchor={toggleButton()}>
          <div>sdsd</div>
          {/* {items.map((item, idx) => {
            <Menu.Item
              key={idx}
              {...item.props}
              style={styles.menuItem}
              className="aloo"
            />;
          })} */}
        </Menu>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    width: "20px",
    height: "20px",
  },
});

export default MenuToggler;
