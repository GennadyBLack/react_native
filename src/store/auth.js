import { makeAutoObservable, runInAction } from "mobx";
import {
  setToken,
  getToken,
  removeToken,
  setInStorage,
  removeFromStorage,
  getFromStorage,
} from "../helpers/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import * as Network from "expo-network";
import api from "../api";

export default class Auth {
  user = null;
  logged = false;
  loading = false;
  error = null;
  location = null;
  device = null;

  fetchMe = async () => {
    try {
      let token = await getToken();
      if (this?.user?.id || !token || token == "null") {
        return;
      }
      this.loading = true;
      await this?.root?.api?.me?.me({}).then((res) => {
        runInAction(async () => {
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
      console.log(data, "DATA");
      console.log(data?.rememberMe, "data?.rememberMe");
      this.loading = true;
      const preData = JSON.parse(JSON.stringify(data));
      const ip = await api.get("https://ipapi.co/json/");
      if (ip || this.device) {
        preData.visits = {
          time: new Date(),
          city: ip?.data.city,
          region: ip?.data?.region,
          country_name: ip?.data?.country_name,
          ip: ip?.data?.ip,
          device: this.device,
        };
      }

      await this.root.api.auth.login(preData).then(async (res) =>
        runInAction(async () => {
          if (res?.data?.token) {
            await setInStorage("rememberMe", "false");
            if (data?.rememberMe) {
              await setInStorage("rememberMe", "true");
              console.log("setting pass");
            }
            if (Platform.OS === "web") {
              await setToken(res?.data?.token);
            } else {
              await SecureStore?.setItemAsync("token", res?.data?.token);
            }
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

  async logout() {
    try {
      this.user = null;
      this.logged = false;
      await removeToken();
      await removeFromStorage("rememberMe");
    } catch (error) {
      this.user = null;
      await removeToken();
      await removeFromStorage("rememberMe");
      console.log(error, " error - auth logout");
    }
  }

  constructor(root) {
    makeAutoObservable(this);
    this.root = root;
    this.api = this.root.api.me;
  }
}
