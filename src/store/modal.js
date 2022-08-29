import { makeAutoObservable, runInAction } from "mobx";

export default class Modal {
  isOpen = false;
  data = null;
  component = null;

  get getData() {
    return this.data;
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
    isOpen = false;
    data = null;
    component = null;
  };

  constructor(root) {
    makeAutoObservable(this);
    this.root = root;
  }
}
