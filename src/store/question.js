import { makeAutoObservable, runInAction } from "mobx";
import question from "../api/question";

export default class Question {
  question = null;
  loading = false;
  error = null;
  pagination = null;
  //
  // getAll = async () => {
  //   try {
  //     this.loading = true;
  //     await this.api.getAll({}).then((res) => {
  //       runInAction(() => {
  //         this.quiz_list = res?.data?.data;
  //         this.pagination = res?.data?.paginator;
  //         this.loading = false;
  //       });
  //     });
  //   } catch (error) {
  //     console.log(error, "error me");
  //     this.root.setError(error);
  //     this.loading = false;
  //   }
  // };
  //
  // get = async (id) => {
  //   try {
  //     this.loading = true;
  //     await this.api.get(id).then((res) => {
  //       this.question = res?.data;
  //       this.loading = false;
  //     });
  //   } catch (error) {
  //     console.log(error, "error me");
  //     this.root.setError(error);
  //     this.loading = false;
  //   }
  // };

  create = async (quizId, data) => {
    try {
      this.loading = true;
      let res = await this.api.create(quizId, data);
      this.question = res?.data;
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
    this.api = this.root.api.question;
  }
}
