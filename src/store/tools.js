import { makeAutoObservable, runInAction } from "mobx";

export default class Tools {
  cameraImage = null;
  image = null;
  imageName = null;
  loading = false;
  error = null;

  uploadImage = async (file) => {
    try {
      console.log(file, "FILE");
      this.loading = true;
      this.imageName = (await this?.api?.upload(file)).data;
    } catch (error) {
      console.log(error, "error file");
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

  setCameraImage = async (img) => {
    try {
      runInAction(() => {
        this.loading = true;
        this.cameraImage = null;
        this.cameraImage = img;
        console.log(img.slice(-55, -1), "store img");
        console.log(img.slice(0, 85), "store img 2");
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
