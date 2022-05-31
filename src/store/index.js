import Todos from "./todo";
import Auth from "./auth";
import Feed from "./feed";
import Tools from "./tools";
import Quiz from "./quiz";
import apis from "../api/api";

export default class store {
  errors = [];
  setError = (error) => {
    this.errors.push(error);
  };

  constructor() {
    this.api = apis;
    this.feed = new Feed(this);
    this.storage = window.localStorage;
    this.todos = new Todos(this);
    this.auth = new Auth(this);
    this.tools = new Tools(this);
    this.quiz = new Quiz(this);
  }
}
