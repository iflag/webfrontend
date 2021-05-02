import { action, makeObservable, observable } from "mobx";
import AuthStore from "./auth-store";

class LoginForm {
  private rootStore: AuthStore;

  loaded: boolean;
  email: string;
  password: string;

  constructor(root: AuthStore) {
    makeObservable(this, {
      loaded: observable,
      email: observable,
      password: observable,

      setLoaded: action,
      setEmail: action,
      setPassword: action,
      resetInfo: action,
    });

    this.rootStore = root;

    this.loaded = true;
    this.email = "";
    this.password = "";
  }

  setLoaded(newLoadState: boolean) {
    this.loaded = newLoadState;
  }
  setEmail(newEmail: string) {
    this.email = newEmail;
  }
  setPassword(newPassword: string) {
    this.password = newPassword;
  }
  resetInfo() {
    this.email = "";
    this.password = "";
  }
}

export default LoginForm;
