import { makeAutoObservable, runInAction } from "mobx";
import { availableLinks } from "../routing/menuHelper";

export default class Menu {
  left_menu = {};
  all_routes = [...availableLinks];
  data = {};
  left_menu_data = {};
  user_menu = {};
  activeRoute = null;

  get leftRoutes() {
    return this.filteredRoutes.filter((item) => {
      return item.leftMenu;
    });
  }

  get allRoutes() {}

  get filteredRoutes() {
    return this.all_routes.filter((item) => {
      const auth = this.root.auth.isAuth;
      const user_links = this?.root?.auth?.user?.user?.menu;
      try {
        //к роуту нужен доступ и пользователь зашел //
        //TODO fix this condition + fix error chenge link in profile
        if (
          (auth && item?.auth && item?.required && user_links?.length) ||
          (user_links?.length && user_links.includes(item?.name))
        ) {
          return true;
        }
        //не авторизован
        if (!auth && !item.auth) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  constructor(root) {
    makeAutoObservable(this);
    this.root = root;
  }
}
