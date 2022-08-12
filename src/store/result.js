import { makeAutoObservable, runInAction } from "mobx";

export default class Result {
  result_list = null;
  result = null;
  question = null;
  loading = false;
  error = null;
  pagination = null;

  getAll = async (config = {}) => {
    try {
      this.loading = true;
      await this?.root?.api?.result.getAll(config).then((res) => {
        runInAction(() => {
          this.result_list = res?.data?.data;
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
      await this?.root?.api?.result.get(id).then((res) => {
        this.result = res?.data;
        this.loading = false;
      });
    } catch (error) {
      console.log(error, "error me");
      this.root.setError(error);
      this.loading = false;
    }
  };

  create = async (data) => {
    try {
      this.loading = true;
      console.log(this.root.api.result, "ALOOO I M HERE");
      let res = await this.root.api.result.create(data);
      this.result = res?.data;
      this.loading = false;
    } catch (error) {
      this.root.setError(error);
      this.loading = false;
    }
  };

  delete = async (id) => {
    try {
      this.loading = true;
      await this.root.api.result.del({ id: id });
      this.loading = false;
    } catch (error) {
      this.root.setError(error);
      this.loading = false;
    }
  };

  clearResults = async () => {
    try {
      this.loading = true;
      await this.root.api.result.clearResults();
      this.loading = false;
    } catch (error) {
      this.root.setError(error);
      this.loading = false;
    }
  };
  update = async (id, data) => {
    try {
      this.loading = true;
      await this.api.update(id, data);
      this.loading = false;
    } catch (error) {
      console.error(error);
      this.root.setError(error);
      this.loading = false;
    }
  };

  start = async (id) => {
    try {
      this.loading = true;
      const res = await this.api.start(id);
      this.result = res;
      console.log(res, "res from result create");
      this.loading = false;
    } catch (error) {
      console.error(error);
      this.root.setError(error);
      this.loading = false;
    }
  };
  setResult = (result) => {
    this.result = result;
  };

  constructor(root) {
    makeAutoObservable(this);
    this.root = root;
    this.api = this.root.api.result;
  }
}
