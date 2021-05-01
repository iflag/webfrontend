import axios, { AxiosResponse } from "axios";
import API_URL, { API_HOST } from "utils/api";
import { getStorageItem, storageAccessKey } from "utils/local-storage";
interface UserDataInterface {
  selectSearchEngine(mode: string): Promise<AxiosResponse<any>>;
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

  async selectSearchEngine(searchEngine: string): Promise<AxiosResponse<any>> {
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
    const response = await this.base.post(portal, data, config);
    return response;
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
    return response;
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

    const response = await this.base.post(history, data, config);
    return response;
  }

  onLogin() {
    const token = getStorageItem(storageAccessKey, "");
    if (token.length > 0) return true;
    else return false;
  }
}

export default UserData;
