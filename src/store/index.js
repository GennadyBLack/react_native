import Todos from "./todo";
import Auth from "./auth";
import Feed from "./feed";
import Tools from "./tools";
import Quiz from "./quiz";
import Question from "./question";
import Answer from "./answer";
import apis from "../api/api";
import Result from "./result";
import Modal from "./modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Menu from "./menu";
import Comments from "./comments";

export default class store {
  errors = [];
  main_spiner = false;
  request_stack = [];
  internet_connection = false;

  //stack of ids like ['quiz','questions'] you to add in request_stack and show main spiner if error - delete from stack
  setSpinerValue = (value) => {
    this.spiner = value;
  };

  addInStack = (item) => {
    request_stack.push(item);
  };

  removeFromStack = (value) => {
    this.request_stack = this.request_stack.filter((item) => item !== value);
    this.main_spiner = this.request_stack.length === 0;
  };

  setInternetConnection = (value) => {
    this.internet_connection = value;
  };

  get getInternet_connection() {
    return this.internet_connection;
  }

  get getSpiner() {
    return { spiner: this.spiner, stack: request_stack.length };
  }

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
    this.modal = new Modal(this);
    this.storage = AsyncStorage;
    this.todos = new Todos(this);
    this.auth = new Auth(this);
    this.tools = new Tools(this);
    this.quiz = new Quiz(this);
    this.question = new Question(this);
    this.answer = new Answer(this);
    this.result = new Result(this);
    this.menu = new Menu(this);
    this.comments = new Comments(this);
  }
}
