import Login from "../screens/Login";
import Main from "../screens/Main";
import Profile from "../screens/Profile";
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

export const profileMenuList = (userMunu = []) => {
  try {
    return availableLinks
      .filter((item) => (item?.required || !item?.auth ? false : true))
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

const availableLinks = [
  {
    name: "Profile",
    component: Profile,
    auth: true,
    options: { headerShown: false },
    required: true,
  },
  {
    name: "ProfileMain",
    component: ProfileMain,
    auth: true,
    options: { headerShown: false },
    required: false,
  },
  {
    name: "Test",
    component: Test,
    auth: false,
    options: { headerShown: false },
    required: false,
  },
  {
    name: "Feed",
    component: Feed,
    auth: true,
    options: { headerShown: false },
    required: false,
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
  {
    name: "FeedEdit",
    component: FeedEdit,
    auth: true,
    options: { headerShown: false },
    required: false,
  },
  {
    name: "Upload",
    component: Upload,
    auth: true,
    options: { headerShown: false },
    required: false,
  },

  {
    name: "Quiz",
    component: Quiz,
    auth: true,
    options: { headerShown: false },
    required: false,
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

//LINKING CONFIG
export const linking = {
  prefixes: [
    /* your linking prefixes */
  ],
  config: {
    /* configuration for matching screens with paths */
    screens: {
      Login: "login",
      Profile: {
        path: "profile",
        screens: {
          ProfileMain: "profile",
        },
      },
      Main: "main",
      Test: "test",
      Feed: {
        path: "feed",
        screens: {
          FeedMain: "feed",
          FeedCreate: "feed_create",
          FeedCurrent: "feed_current",
          FeedEdit: "feed_edit",
          Upload: "feed/upload",
        },
      },
      Quiz: {
        path: "quiz",
        screens: {
          QuizList: "quiz_list",
          QuizCreate: "quiz_create",
          QuizCurrent: "quiz_current",
          QuizEdit: "quiz_edit",
          QuizMain: "quiz_start",
        },
      },
      Register: "register",
      Chat: "chat",
    },
  },
};

let filterMenuLinks = (auth = false, user_links = []) => {
  return availableLinks.filter((item) => {
    try {
      //к роуту нужен доступ и пользователь зашел //
      //TODO fix this condition + fix error chenge link in profile
      if (
        (auth && item?.auth && item?.required && user_links.length) ||
        (user_links.length && user_links.includes(item?.name))
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
