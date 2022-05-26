import { makeAutoObservable, runInAction } from "mobx";

export default class Todos {
  errors = null;

  loading = true;

  todos = [
    { id: 1, title: "text some thing", completed: false, important: true },
    { id: 2, title: "text some thing 2", completed: false, important: true },
    { id: 3, title: "text some thing 3", completed: false, important: true },
  ];

  get all() {
    return this.todos;
  }
  get completed() {
    return this.todos.filter((item) => item.completed === true);
  }
  get important() {
    return this.todos.filter((item) => item.important === true);
  }
  add = (todo) => {
    this.todos.push(todo);
  };
  remove = (id) => {
    this.todos = this.todos.filter((item) => item.id !== id);
  };
  change = (task) =>
    (this.todos = this.todos.map((item) =>
      item.id === task.id ? task : item
    ));

  constructor(root) {
    makeAutoObservable(this);
    this.root = root;
  }
}
