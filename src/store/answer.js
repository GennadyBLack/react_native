import { makeAutoObservable, runInAction } from "mobx";
import answer from "../api/answer";

export default class Answer {
  answer = [];
  loading = false;
  error = null;
  pagination = null;

  create = async (questId, data) => {
    try {
      this.loading = true;
      console.log(this.api, "ALOOO I M HERE");
      let res = await this.api.create(questId, data);
      if (res && res.data) {
        this.answer.push(res?.data);
      }
      this.loading = false;
    } catch (error) {
      this.root.setError(error);
      this.loading = false;
    }
  };

  delete = async (id) => {
    try {
      this.loading = true;
      let res = await this.api.del(id);
      this.loading = false;
    } catch (error) {
      this.root.setError(error);
      this.loading = false;
    }
  };
  update = async (id, data) => {
    try {
      this.loading = true;
      await this.api.update(id, { data });
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
    this.api = this.root.api.answer;
  }
}
