import { makeAutoObservable, runInAction } from "mobx";

export default class Quiz {
  quiz_list = null;
  quiz = null;
  question = null;
  loading = false;
  error = null;
  result = null;
  pagination = null;

  getAll = async (config = {}) => {
    try {
      this.loading = true;
      console.log(config, "config");
      await this?.root?.api?.quiz.getAll(config).then((res) => {
        runInAction(() => {
          this.quiz_list = res?.data?.data;
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
      await this?.root?.api?.quiz.get(id).then((res) => {
        this.quiz = res?.data;
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
      console.log(this.root.api.quiz, "ALOOO I M HERE");
      let res = await this.root.api.quiz.create(data);
      this.quiz = res?.data;
      this.loading = false;
    } catch (error) {
      this.root.setError(error);
      this.loading = false;
    }
  };

  delete = async (id) => {
    try {
      this.loading = true;
      await this.root.api.quiz.del({ id: id });
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
      this.result = res.data;
      this.root.result.setResult(res.data);
      console.log(res, "res from result create");
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
    this.api = this.root.api.quiz;
  }
}
