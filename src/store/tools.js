import { makeAutoObservable, runInAction } from "mobx";

export default class Tools {
  preLoadImage = null;
  image = null;
  imageName = null;
  loading = false;
  error = null;

  uploadImage = async (file) => {
    try {
      this.loading = true;
      this.imageName = (await this?.api?.upload(file)).data;
    } catch (error) {
      this.root.setError(error);
      this.loading = false;
    }
  };

  getImage = async () => {
    try {
      this.loading = true;
      this.image = await this?.api?.get(this.imageName);
    } catch (error) {
      console.log(error, "error file");
      this.root.setError(error);
      this.loading = false;
    }
  };

  setPreLoadImage = async (img) => {
    try {
      runInAction(() => {
        this.loading = true;
        this.preLoadImage = null;
        this.preLoadImage = img;
        this.loading = false;
      });
    } catch (error) {
      console.log(error, "error file");
      this.root.setError(error);
      this.loading = false;
    }
  };

  // delete = async (id) => {
  //   try {
  //     this.loading = true;
  //     let res = await this.root.api.feed.del({ id: id });
  //     this.loading = false;
  //   } catch (error) {
  //     this.root.setError(error);
  //     this.loading = false;
  //   }
  // };
  // update = async (data) => {
  //   try {
  //     this.loading = true;
  //     let res = await this.root.api.feed.update({ id: id, data: data });
  //     this.loading = false;
  //   } catch (error) {
  //     this.root.setError(error);
  //     this.loading = false;
  //   }
  // };

  constructor(root) {
    makeAutoObservable(this);
    this.root = root;
    this.api = this.root.api.tools;
  }
}
