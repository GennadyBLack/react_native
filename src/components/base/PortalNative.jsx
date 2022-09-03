import React, { useContext, useState } from "react";
import PortalContext from "../../contexts/portalContext";

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
  console.log(gateName, "gateName");
  console.log(children, "children");
  console.log(value.teleport, "children");
  console.log(value.gates, "gates");

  return (
    <>
      {value.gates[gateName]}
      {children && children(value.teleport)}
    </>
  );
};
