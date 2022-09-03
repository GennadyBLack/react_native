import { createContext } from "react";

const PortalContext = createContext({
  gates: {},
  teleport: (gateName, element) => {
    return;
  },
  destroy: (gateName) => {
    return;
  },
});
export default PortalContext;
