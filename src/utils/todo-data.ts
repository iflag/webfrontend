import axios from "axios";
import API_URL, { API_HOST } from "utils/api";
import { getStorageItem, storageAccessKey } from "utils/local-storage";

class TodoData {
  private base;
  private todoUrl;
  constructor() {
    this.base = axios.create({
      baseURL: API_HOST,
    });
    this.todoUrl = API_URL.notes;
  }

  async getAllTodoList() {
    const { todo } = this.todoUrl;

    const token = getStorageItem(storageAccessKey, "");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await this.base.get(todo, config);
    const result = await response.data;
    return result;
  }

  async addTodo(contents: string) {
    const { todo } = this.todoUrl;

    const data = {
      contents,
    };

    const token = getStorageItem(storageAccessKey, "");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await this.base.post(todo, data, config);
    return response;
  }

  async completeTodo(id: number) {
    const { completed } = this.todoUrl;
    const url = `${completed}${id}`;

    const token = getStorageItem(storageAccessKey, "");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await this.base.put(url, "", config);
  }

  async updateTodo(id: number, contents: string) {
    const { todo } = this.todoUrl;
    const url = `${todo}/${id}`;

    const data = {
      contents,
    };

    const token = getStorageItem(storageAccessKey, "");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await this.base.put(url, data, config);
  }
}

export default TodoData;
