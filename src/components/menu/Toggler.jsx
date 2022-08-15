import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

const Toggler = ({
  children,
  anchor,
  useToggle,
  template,
  list,
  data = {},
}) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((val) => !val);
  };

  const _renderList = () => {
    if (!list?.length) return;
    return (
      <View>
        {list.map((item, idx) =>
          template ? template(item) : <View key={idx}>{item}</View>
        )}
      </View>
    );
  };

  const _renderChildren = () =>
    children &&
    React.Children.map(children, (child, idx) => {
      return data
        ? React.createElement(child.type, {
            ...{
              ...child.props,
              key: idx,
              ...data,
            },
          })
        : child;
    });

  const content = list?.length ? _renderList() : _renderChildren();

  return (
    <View>
      {useToggle ? (
        <View onPress={handleToggle} style={styles.anchor}>
          {anchor}
        </View>
      ) : null}
      {useToggle && toggle ? content : null}
    </View>
  );
};

const styles = StyleSheet.create({
  anchor: {
    zIndex: 10000,
  },
});

export default Toggler;
