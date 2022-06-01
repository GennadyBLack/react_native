import { useContext } from "react";

import storeContext from "../contexts/store";

export default function useStore(...list) {
  let stores = useContext(storeContext);
  return list.length > 0 ? list.map((name) => stores[name]) : stores;
}
