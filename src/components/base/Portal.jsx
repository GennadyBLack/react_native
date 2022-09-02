import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";

const Portal = ({ children, id }) => {
  const [modal] = useStore("modal");
  const elId = id ? id : "modal-root";
  let mount = document.getElementById(`${elId}`);
  const el = document.createElement("div");

  useEffect(() => {
    mount = document.getElementById(`${elId}`);
    console.log(mount, "mount");
    if (!mount) return;
    mount.appendChild(el);
    return () => mount.removeChild(el);
  }, [el, mount, modal?.getIsOpen]);

  return createPortal(children, el);
};

export default observer(Portal);
