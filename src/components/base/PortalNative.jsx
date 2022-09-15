import React, { useContext, useState } from "react";
import PortalContext from "../../contexts/portalContext";
import { View } from "react-native";

export const PortalProvider = ({ children }) => {
  const [gates, setGates] = useState({});
  const teleport = (gateName, element) =>
    setGates({ ...gates, [gateName]: element });
  const destroy = (gateName) => {
    const newGates = Object.keys(gates).reduce((acc, next) => {
      if (next !== gateName) {
        acc[next] = gates[next];
      }
      return acc;
    }, {});
    setGates({ ...newGates });
  };
  return (
    <PortalContext.Provider value={{ gates, teleport, destroy }}>
      {children}
    </PortalContext.Provider>
  );
};

export const PortalGate = ({ gateName, children }) => {
  const value = useContext(PortalContext);
  // console.log(gateName, "gateName");
  // console.log(value.gates, "gates");
  // console.log(children, "children");
  // console.log(value.gates, "gates");

  return (
    <View>
      {value.gates[gateName]}
      {children}
    </View>
  );
};
