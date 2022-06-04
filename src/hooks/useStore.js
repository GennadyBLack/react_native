import { useContext } from "react";

import storeContext from "../contexts/store";

export default function useStore(...list) {
  try {
    let stores = useContext(storeContext);
    return list.length > 0
      ? list.map((name) => {
          return stores[name] ? stores[name] : null;
        })
      : stores;
  } catch (e) {
    console.error(e);
  }
}
