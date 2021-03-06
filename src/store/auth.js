import { makeAutoObservable, runInAction } from "mobx";
import { setToken, getToken, removeToken } from "../helpers/storage";

export default class Auth {
  user = null;
  logged = false;
  loading = false;
  error = null;

  fetchMe = async () => {
    try {
      let token = await getToken();
      if (this?.user?.id || !token || token == "null") {
        return;
      }
      this.loading = true;
      await this?.root?.api?.me?.me({}).then((res) => {
        runInAction(() => {
          this.user = res?.data?.data;
          this.logged = true;
          this.loading = false;
        });
      });
    } catch (error) {
      await removeToken();

      this.root.setError(error, "auth fetch me");
      this.loading = false;
    }
  };
  login = async (data) => {
    try {
      this.loading = true;

      await this.root.api.auth.login(data).then(async (res) =>
        runInAction(async () => {
          if (res?.data?.token) {
            await setToken(res?.data?.token);
            await this.fetchMe();
          }
        })
      );

      this.loading = false;
    } catch (error) {
      this.root.setError(error);
      this.loading = false;
    }
  };

  register = async (data) => {
    try {
      this.loading = true;
      let res = await this.root.api.auth.register(data);
      if (res?.data?.token) {
        await setToken(res?.data?.token);
        await this.fetchMe();
      }
      this.loading = false;
    } catch (error) {
      this.root.setError(error);
      this.loading = false;
    }
  };
  updateMe = async (data) => {
    try {
      let token = getToken();
      if (this?.user?.id || !token) {
        return;
      }
      this.loading = true;
      await this?.root?.api?.me?.update({ data: data }).then((res) => {
        runInAction(() => {
          this.user = res?.data?.data;
          this.logged = true;
          this.loading = false;
        });
      });
      await this.fetchMe();
    } catch (error) {
      console.log(error, "error me");
      // this.root.setError(error);
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
