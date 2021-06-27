import AuthStore from "stores/auth-store";
import { action, makeObservable, observable } from "mobx";
import { RootStore } from "stores/root-store";
import TodoData from "utils/todo-data";
import { Todo } from "components/feature/main-page/memo/todo-list";

class TodoStore {
  private rootStore: RootStore;

  private todoData: TodoData;

  todoList: Todo[];

  constructor(root: RootStore, private authStore: AuthStore) {
    makeObservable(this, {
      todoList: observable,

      refreshTodoList: action,
      addTodo: action,
      deleteTodo: action,
      completeTodo: action,
      editTodo: action,
    });

    this.rootStore = root;

    this.todoData = new TodoData();

    this.todoList = [];
  }

  setTodoList(todos: Todo[]) {
    this.todoList = todos;
  }

  async refreshTodoList() {
    if (!this.authStore.onLogin) {
      this.setTodoList([]);
      return;
    }

    try {
      const result = await this.todoData.getAllTodoList();
      this.setTodoList(result.todos);
    } catch (error) {
      alert(error.request.response);
    }
  }

  async addTodo(contents: string) {
    this.authStore.checkAccessToken();

    await this.todoData.addTodo(contents);
    await this.refreshTodoList();
  }

  async deleteTodo(id: number) {
    this.authStore.checkAccessToken();

    await this.todoData.deleteTodo(id);
    await this.refreshTodoList();
  }

  async completeTodo(id: number) {
    this.authStore.checkAccessToken();

    await this.todoData.completeTodo(id);
  }

  async editTodo(id: number, contents: string) {
    this.authStore.checkAccessToken();

    await this.todoData.updateTodo(id, contents);
  }
}

export default TodoStore;
