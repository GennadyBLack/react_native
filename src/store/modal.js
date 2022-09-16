import { makeAutoObservable, runInAction } from "mobx";
import { Text } from "react-native";

export default class Modal {
  modal = null;
  content = null;
  scrollFn = null;
  isOpen = false;
  data = null;
  component = null;
  params = { toTop: null, toMiddle: null, toBottom: null };

  get getData() {
    return this.data;
  }
  get getParams() {
    return this.params;
  }

  get getIsOpen() {
    return this.isOpen;
  }

  get getContent() {
    return this.content || <Text>Заглушка</Text>;
  }

  setData = (data) => {
    this.data = data;
  };

  setModal = (refObj) => {
    this.modal = refObj;
  };

  setScrollFn = (fn) => {
    this.scrollFn = fn;
  };

  setContent = (content) => {
    this.content = content;
  };

  setOpen = () => {
    this.isOpen = true;
  };

  setClose = () => {
    this.isOpen = false;
  };
  setIsOpen = (val) => {
    this.isOpen = val;
  };
  toggle = () => {
    this.isOpen = !this.isOpen;
  };

  clearData = () => {
    this.isOpen = false;
    this.data = null;
    this.component = null;
  };

  constructor(root) {
    makeAutoObservable(this);
    this.root = root;
  }
}
