import { makeAutoObservable, runInAction } from "mobx";

export default class ModalBck {
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

  setData = (data) => {
    this.data = data;
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
