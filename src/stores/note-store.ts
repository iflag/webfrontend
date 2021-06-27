import AuthStore from "stores/auth-store";
import { action, makeObservable, observable } from "mobx";
import { RootStore } from "stores/root-store";
import NoteData from "utils/note-data";

class NoteStore {
  private rootStore: RootStore;

  private noteData: NoteData;

  note: string;

  constructor(root: RootStore, private authStore: AuthStore) {
    makeObservable(this, {
      note: observable,

      setNote: action,
      refreshNoteContents: action,
      editNoteContents: action,
      deleteNoteContents: action,
    });

    this.rootStore = root;

    this.noteData = new NoteData();

    this.note = "";
  }

  setNote(content: string) {
    this.note = content;
  }

  async refreshNoteContents() {
    if (!this.authStore.onLogin) {
      this.setNote("");
      return;
    }
    try {
      const result = await this.noteData.getNoteContents();
      this.setNote(result.contents);
    } catch (error) {
      alert(error.request.response);
      this.setNote("");
    }
  }

  async editNoteContents(contents: string) {
    this.authStore.checkAccessToken();

    await this.noteData.editNote(contents);
    await this.refreshNoteContents();
  }

  async deleteNoteContents() {
    this.authStore.checkAccessToken();

    await this.noteData.deleteAllNote();
    await this.refreshNoteContents();
  }
}

export default NoteStore;
