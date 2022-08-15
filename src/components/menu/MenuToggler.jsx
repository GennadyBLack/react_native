import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Menu, Provider } from "react-native-paper";

const MenuToggler = ({ items, anchor }) => {
  const [visible, setVisible] = useState(true);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const toggleButton = () => {
    return anchor ? (
      <Button onPress={openMenu} style={{ zIndex: 10000 }}>
        {anchor}
      </Button>
    ) : (
      <Button onPress={openMenu}>Show menu</Button>
    );
  };

  if (!items.length) {
    return <div>no</div>;
  }
  return (
    <Provider style={styles.index}>
      <View
        style={{
          zIndex: 1000000,
        }}
      >
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={toggleButton()}
          style={styles.menu}
        >
          {items.map((item, idx) => {
            return (
              <View style={{ zIndex: 10000 }}>
                {item?.icon ?? null}
                <Menu.Item
                  key={idx}
                  title={item.title}
                  onPress={item.onPress}
                  style={styles?.menuItem}
                />
              </View>
            );
          })}
        </Menu>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    zIndex: 1000,
  },
  menu: {
    zIndex: 1000000000,
    left: "30%",
  },
  index: {
    zIndex: 10000,
  },
});

export default MenuToggler;
