import { makeAutoObservable } from "mobx";
import { setToken } from "../helpers/storage";

export default class Auth {
  user = null;
  logged = false;
  loading = false;
  error = null;

  fetchMe = async () => {
    try {
      if (this.user?.id) {
        return;
      }
      this.loading = true;
      await this?.root?.api?.me?.me({}).then((res) => {
        this.user = res?.data?.data;
        this.logged = true;
        this.loading = false;
      });
    } catch (error) {
      console.log(error, "error me");
      this.root.setError(error);
      this.loading = false;
    }
  };
  login = async (data) => {
    try {
      this.loading = true;

      let res = await this.root.api.auth.login(data);

      if (res?.data?.access_token) {
        await setToken(res?.data?.access_token);
        await this.fetchMe();
      }
      this.loading = false;
    } catch (error) {
      this.root.setError(error);
      this.loading = false;
    }
  };

  get isAuth() {
    return this.logged;
  }

  logout() {
    this.user = null;
    localStorage.setItem("token", null);
  }
  constructor(root) {
    makeAutoObservable(this);
    this.root = root;
    this.api = this.root.api.me;
  }
}
