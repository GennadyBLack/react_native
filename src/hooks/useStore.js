import { useContext } from "react";

import storeContext from "../contexts/store";

export default function useStore(...list) {
  try {
    console.log(list);
    let stores = useContext(storeContext);
    return list.length > 0
      ? list.map((name) => {
          console.log(stores[name], "stores[name]");
          return stores[name] ? stores[name] : null;
        })
      : stores;
  } catch (e) {
    console.error(e);
  }
}
