export const storageAccessKey = "IFLAG_STORAGE_ACCESS_KEY";
export const storageRefreshKey = "IFLAG_STORAGE_REFRESH_KEY";
export const storageAccessTokenExp = "IFLAG_STORAGE_ACCESS_TOKEN_EXP";

export const getStorageItem = (key: string, initialValue: string) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.log(error);
    return initialValue;
  }
};

export const setStorageItem = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const removeStorageItem = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};
