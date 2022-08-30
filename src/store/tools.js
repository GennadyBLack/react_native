import { makeAutoObservable, runInAction } from "mobx";

export default class Tools {
  image = null;
  loading = false;
  error = null;

  uploadImage = async (file) => {
    try {
      this.loading = true;
      this.image = (await this?.api?.upload(file)).data;
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
