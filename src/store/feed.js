import { makeAutoObservable, runInAction } from "mobx";

export default class Feed {
  feeds = null;
  currentFeed = null;
  id = null;
  loading = false;
  error = null;
  pagination = null;

  getAll = async (filters = {}) => {
    try {
      this.loading = true;
      await this?.root?.api?.feed.getAll(filters).then((res) => {
        runInAction(() => {
          this.feeds = res?.data?.data;
          this.pagination = res?.data?.paginator;
          this.loading = false;
        });
      });
    } catch (error) {
      console.log(error, "error me getAll");
      this.root.setError(error);
      this.loading = false;
    }
  };

  get = async (id, config = {}) => {
    try {
      this.loading = true;
      await this?.root?.api?.feed.get(id, config).then((res) => {
        this.currentFeed = res?.data;
        this.loading = false;
      });
    } catch (error) {
      console.log(error, "error me get");
      this.root.setError(error);
      this.loading = false;
    }
  };

  create = async (data) => {
    try {
      this.loading = true;
      let res = await this.root.api.feed
        .create({
          ...data,
          path: this.root.tools.imageName,
        })
        .then((res) => {
          runInAction(() => {
            this.currentFeed = res?.data;
            this.loading = false;
          });
        });
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
      await this.root.api.feed.update(id, {
        data: { ...data, path: this.root.tools.imageName },
      });
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
