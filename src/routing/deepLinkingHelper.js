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
      // ProfileMain: "profile",
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
