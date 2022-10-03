import Login from "../screens/Login";

import Register from "../screens/Register";
import Feed from "../screens/Feed";
import Test from "../screens/Test";
import Quiz from "../screens/Quiz";
import ProfileMain from "../components/profile/ProfileMain";
import FeedEdit from "../components/feed/FeedEdit";
import FeedMain from "../components/feed/FeedMain";
import FeedCreate from "../components/feed/FeedCreate";
import FeedCurrent from "../components/feed/FeedCurrent";
import Upload from "../components/validation/Upload";
import Cam from "../screens/Cam";
import {getIcon} from "../helpers/iconHelper";

export const profileMenuList = (userMunu = []) => {
  try {
    return availableLinks
      .filter((item) => !(item?.required || !item?.auth))
      .map((item) => {
        if (Array.isArray(userMunu) && userMunu.includes(item?.name)) {
          return {
            label: item.name,
            value: true,
          };
        } else {
          return {
            label: item.name,
            value: false,
          };
        }
      });
  } catch (error) {
    console.error(error);
  }
  //не выводить в профиле чекбокс если ссылка обязательна
};

export const availableLinks = [
  {
    name: "ProfileMain",
    component: ProfileMain,
    auth: true,
    options: {
      headerShown: false,
      tabBarLabel: "",
      tabBarIcon: ({ color, size }) => getIcon("user", color, size),
    },
    required: true,
    leftMenu: true,
  },
  {
    name: "Test",
    component: Test,
    auth: true,
    options: {
      headerShown: true,
      tabBarLabel: "",
      tabBarIcon: ({ color, size }) => getIcon("list", color, size),
    },
    required: true,
    leftMenu: true,
  },
  {
    name: "Feed",
    component: Feed,
    auth: true,
    options: {
      headerShown: false,
      tabBarLabel: "",
      tabBarIcon: ({ color, size }) => getIcon("home", color, size),
    },
    required: true,
    leftMenu: true,
  },
  {
    name: "FeedEdit",
    component: FeedEdit,
    auth: true,
    options: { headerShown: false },
    required: false,
  },
  {
    name: "FeedMain",
    component: FeedMain,
    auth: true,
    options: { headerShown: false },
    required: false,
    leftMenu: true,
  },
  {
    name: "FeedCreate",
    component: FeedCreate,
    auth: true,
    options: { headerShown: false },
    required: false,
  },
  {
    name: "FeedCurrent",
    component: FeedCurrent,
    auth: true,
    options: { headerShown: false },
    required: false,
  },
  // {
  //   name: "FeedEdit",
  //   component: FeedEdit,
  //   auth: true,
  //   options: { headerShown: false },
  //   required: false,
  // },
  {
    name: "Upload",
    component: Upload,
    auth: true,
    options: { headerShown: false },
    required: false,
  },
  {
    name: "Cam",
    component: Cam,
    auth: true,
    options: { headerShown: false },
    required: false,
  },

  {
    name: "Quiz",
    component: Quiz,
    auth: true,
    options: {
      headerShown: false,
      tabBarLabel: "",
      tabBarIcon: ({ color, size }) => getIcon("question", color, size),
    },
    required: false,
    leftMenu: true,
  },
  {
    name: "Login",
    component: Login,
    auth: false,
    options: { headerShown: false },
    required: false,
  },
  {
    name: "Register",
    component: Register,
    auth: false,
    options: { headerShown: false },
    required: false,
  },
];

let filterMenuLinks = (auth = false, user_links = []) => {
  return availableLinks.filter((item) => {
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
};

export default filterMenuLinks;
