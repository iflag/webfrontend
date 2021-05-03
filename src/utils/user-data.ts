import axios from "axios";
import API_URL, { API_HOST } from "utils/api";
import { getStorageItem, storageAccessKey } from "utils/local-storage";
interface UserDataInterface {
  selectSearchEngine(mode: string): Promise<void>;
}
class UserData implements UserDataInterface {
  private base;
  private userUrl;
  constructor() {
    this.base = axios.create({
      baseURL: API_HOST,
    });
    this.userUrl = API_URL.users;
  }

  async selectSearchEngine(searchEngine: string): Promise<void> {
    const { portal } = this.userUrl;
    const data = {
      portal: searchEngine,
    };

    const token = getStorageItem(storageAccessKey, "");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await this.base.post(portal, data, config);
  }

  async getSelectedSearchEngine() {
    const { portal } = this.userUrl;

    const token = getStorageItem(storageAccessKey, "");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await this.base.get(portal, config);
    const result = await response.data;
    return result;
  }

  async saveSearchHistory(searched: string) {
    const { history } = this.userUrl;
    const data = {
      keyword: searched,
    };

    const token = getStorageItem(storageAccessKey, "");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await this.base.post(history, data, config);
  }
}

export default UserData;
