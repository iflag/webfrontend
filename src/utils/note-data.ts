import axios from "axios";
import API_URL, { API_HOST } from "utils/api";
import { getStorageItem, storageKey } from "utils/local-storage";

class NoteData {
  private base;
  private noteUrl;
  constructor() {
    this.base = axios.create({
      baseURL: API_HOST,
    });
    this.noteUrl = API_URL.notes;
  }

  async getNoteContents() {
    const { notes } = this.noteUrl;

    const token = getStorageItem(storageKey, "");
    const config = {
      headers: {
        Authorization: `X-JWT ${token}`,
      },
    };

    const response = await this.base.get(notes, config);
    return response;
  }

  async editNote(contents: string) {
    const { notes } = this.noteUrl;

    const token = getStorageItem(storageKey, "");
    const config = {
      headers: {
        Authorization: `X-JWT ${token}`,
      },
    };

    const data = {
      contents,
    };

    const response = await this.base.post(notes, data, config);
    return response;
  }

  async deleteAllContents() {
    const { notes } = this.noteUrl;

    const token = getStorageItem(storageKey, "");
    const config = {
      headers: {
        Authorization: `X-JWT ${token}`,
      },
    };

    const response = await this.base.delete(notes, config);
    return response;
  }
}

export default NoteData;
