import BookmarkStore from "stores/bookmark-store";
import AuthStore from "stores/auth-store";
import FolderStore from "stores/folder-store";
import NoteStore from "./note-store";
import TodoStore from "./todo-store";
export class RootStore {
  authStore: AuthStore;
  folderStore: FolderStore;
  bookmarkStore: BookmarkStore;
  noteStore: NoteStore;
  todoStore: TodoStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.folderStore = new FolderStore(this, this.authStore);
    this.bookmarkStore = new BookmarkStore(
      this,
      this.authStore,
      this.folderStore
    );
    this.noteStore = new NoteStore(this, this.authStore);
    this.todoStore = new TodoStore(this, this.authStore);
  }
}
