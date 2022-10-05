import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
// import useOnClickOutside from "../../hooks/useClickOutside";

const MenuToggler = ({ items, anchor }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const ref = useRef();

  const toggleButton = () => {
    return anchor ? (
      <Pressable onPress={openMenu}>{anchor}</Pressable>
    ) : (
      <Pressable onPress={openMenu}>
        <Text>Show menu</Text>
      </Pressable>
    );
  };

  // useOnClickOutside(ref, () => closeMenu());

  if (!items.length) {
    return <div>no</div>;
  }
  return (
    <View
      ref={ref}
      style={{
        zIndex: 1000000,
      }}
    >
      {visible ? (
        <View style={styles.menu}>
          {items.map((item, idx) => {
            return (
              <View style={{ zIndex: 10000 }} key={idx}>
                {item?.icon ?? <Text></Text>}
                <Pressable
                  key={idx}
                  onPress={item.onPress}
                  style={styles?.menuItem}
                >
                  <Text> {item?.title}</Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      ) : (
        toggleButton()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    zIndex: 10,
    padding: 10,
  },
  menu: {
    zIndex: 10000000,
    left: "30%",
    padding: 10,
    marginRight: 30,
    borderRadius: 10,
    borderColor: "#eee",
    borderWidth: 1,
    backgroundColor: "white",
  },
  index: {
    zIndex: 100,
  },
});

export default MenuToggler;
