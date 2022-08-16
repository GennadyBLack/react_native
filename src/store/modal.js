import { makeAutoObservable, runInAction } from "mobx";

export default class Modal {
  isOpen = false;
  data = null;

  get getData() {
    return this.data;
  }

  get getIsOpen() {
    return this.isOpen;
  }

  setData = (data) => {
    this.data = data;
  };

  setIsOpen = (val) => {
    this.isOpen = val;
  };
  toggle = () => {
    this.isOpen = !this.isOpen;
  };

  constructor(root) {
    makeAutoObservable(this);
    this.root = root;
  }
}
