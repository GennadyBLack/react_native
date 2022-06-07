import Todos from "./todo";
import Auth from "./auth";
import Feed from "./feed";
import Tools from "./tools";
import Quiz from "./quiz";
import Question from "./question";
import Answer from "./answer";
import apis from "../api/api";
import Result from "./result";

export default class store {
  errors = [];
  setError = (error, methodName) => {
    this.errors.push({
      message: `${error?.message} from: ${methodName ?? ""}`,
    });
  };
  removeError = (index) => {
    this.errors = this.errors.filter((item, ind) => ind !== index);
  };

  constructor() {
    this.api = apis;
    this.feed = new Feed(this);
    this.storage = window.localStorage;
    this.todos = new Todos(this);
    this.auth = new Auth(this);
    this.tools = new Tools(this);
    this.quiz = new Quiz(this);
    this.question = new Question(this);
    this.answer = new Answer(this);
    this.result = new Result(this);
  }
}
