import React from "react";
import baseIcons from "../../content/iconPack/baseIcons";
import arrows from "../../content/iconPack/arrows";
import { Image } from "react-native";

const Icon = ({ source, style }) => {
  try {
    if (!source) {
      return null;
    }
    return (
      <Image
        nativeID="icon-id"
        style={{ ...(style ?? { width: 40, height: 40 }) }}
        source={source}
      />
    );
  } catch (error) {
    console.log(error);
  }
};

Icon.sources = {
  base: baseIcons,
  arrows,
};

export default Icon;
