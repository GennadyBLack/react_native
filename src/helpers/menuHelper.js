import Login from "../screens/Login";
import Main from "../screens/Main";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Feed from "../screens/Feed";
import Test from "../screens/Test";
import Quiz from "../screens/Quiz";

const availableLinks = [
  {
    name: "Profile",
    component: Profile,
    public: false,
    auth: true,
    options: { headerShown: false },
  },
  {
    name: "Test",
    public: false,
    component: Test,
    auth: true,
    options: { headerShown: false },
  },
  {
    name: "Feed",
    component: Feed,
    public: false,
    auth: true,
    options: { headerShown: false },
  },
  {
    name: "Quiz",
    component: Quiz,
    public: false,
    auth: true,
    options: { headerShown: false },
  },
  {
    name: "Login",
    component: Login,
    public: false,
    auth: false,
    options: { headerShown: false },
  },

  // {
  //   name: "Chat",
  //component:Profile,
  //   public: false,
  //   auth: true,
  //   options: { headerShown: false },
  // },
  {
    name: "Register",
    public: false,
    component: Register,
    auth: false,
    options: { headerShown: false },
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
          FeedCurrent: "feed/:id",
          FeedEdit: "feed/:id/edit",
          Upload: "feed/upload",
        },
      },
      Quiz: {
        path: "quiz",
        screens: {
          QuizList: "quiz_list",
          QuizCreate: "quiz_create",
          QuizCurrent: "quiz/:id",
          QuizEdit: "quiz/:id/edit",
        },
      },
      Register: "register",
      Chat: "chat",
    },
  },
};

let filterMenuLinks = (auth, user_links) => {
  return availableLinks.filter((item) => {
    if (auth && item.auth) {
      return true;
    }
    if (item.public) {
      return true;
    }
    if (!auth && !item.auth) {
      return true;
    }
  });
};
export default filterMenuLinks;
