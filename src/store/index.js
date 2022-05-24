import Todos from "./todo";
import Auth from "./auth";

import apis from "../api/api";
export default class store {
  errors = [];
  setError = (error) => {
    this.errors.push(error);
  };

  constructor() {
    this.api = apis;
    this.storage = window.localStorage;
    this.todos = new Todos(this);
    this.auth = new Auth(this);
  }
}
