import { makeAutoObservable, runInAction } from "mobx";
import { setToken } from "../helpers/storage";

// import { configure } from "mobx";

// configure({
//   enforceActions: "never",
// });
export default class Feed {
  feeds = null;
  currentFeed = null;
  id = null;
  loading = false;
  error = null;
  pagination = null;

  getAll = async () => {
    try {
      this.loading = true;
      await this?.root?.api?.feed.getAll({}).then((res) => {
        runInAction(() => {
          this.feeds = res?.data?.data;
          this.pagination = res?.data?.paginator;
          this.loading = false;
        });
      });
    } catch (error) {
      console.log(error, "error me");
      this.root.setError(error);
      this.loading = false;
    }
  };

  get = async (id) => {
    try {
      this.loading = true;
      await this?.root?.api?.feed.get(id).then((res) => {
        this.currentFeed = res?.data;
        this.loading = false;
      });
    } catch (error) {
      console.log(error, "error me");
      this.root.setError(error);
      this.loading = false;
    }
  };

  create = async (data) => {
    console.log("fere", this.root.api);
    try {
      this.loading = true;
      let res = await this.root.api.feed.create(data);
      currentFeed = res?.data;
      this.loading = false;
    } catch (error) {
      this.root.setError(error);
      this.loading = false;
    }
  };

  delete = async (id) => {
    try {
      this.loading = true;
      let res = await this.root.api.feed.del(id);
      this.loading = false;
    } catch (error) {
      this.root.setError(error);
      this.loading = false;
    }
  };
  update = async (id, data) => {
    try {
      this.loading = true;
      await this.root.api.feed.update(id, { data });
      this.loading = false;
    } catch (error) {
      console.error(error);
      this.root.setError(error);
      this.loading = false;
    }
  };

  constructor(root) {
    makeAutoObservable(this);
    this.root = root;
    this.api = this.root.api.feed;
  }
}
