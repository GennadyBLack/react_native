import React from "react";
import baseIcons from "../../content/iconPack/baseIcons";
import { Image } from "react-native";

const Icon = ({ source, style }) => {
  try {
    if (!source) {
      return null;
    }
    return (
      <Image
        style={{ ...(style ?? { width: "100%", height: "100%" }) }}
        source={source}
      />
    );
  } catch (error) {
    console.log(error);
  }
};

Icon.sources = {
  base: baseIcons,
};

export default Icon;