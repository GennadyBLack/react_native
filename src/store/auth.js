import { makeAutoObservable, runInAction } from "mobx";
import {
  setToken,
  getToken,
  removeToken,
  setInStorage,
} from "../helpers/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
            await setInStorage("last_login", `${new Date()}`);
            await this.fetchMe();
          }
        })
      );

      this.loading = false;
    } catch (error) {
      this.root.setError(error);
      this.loading = false;
      removeToken();
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
      console.log(error, "error me updateMe");
      // this.root.setError(error);
      this.loading = false;
    }
  };

  get isAuth() {
    return this.logged;
  }

  logout() {
    try {
      this.user = null;
      this.logged = false;
      removeToken();
    } catch (error) {
      this.user = null;
      removeToken();
      console.log(error, " error - auth logout");
    }
  }

  constructor(root) {
    makeAutoObservable(this);
    this.root = root;
    this.api = this.root.api.me;
  }
}
