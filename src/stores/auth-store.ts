import { SelectedForm } from "components/Layout/header";
import { action, makeObservable, observable, reaction } from "mobx";
import AuthService from "utils/auth-service";
import {
  getStorageItem,
  setStorageItem,
  storageAccessKey,
  storageRefreshKey,
} from "utils/local-storage";
import LoginForm from "./login-form-store";
import RegisterForm from "./register-form-store";
import { RootStore } from "./root-store";

class AuthStore {
  private rootStore: RootStore;

  onLogin: boolean;
  requireRefresh: boolean;

  handleToken: () => void;

  private authService: AuthService;

  registerForm: RegisterForm;
  loginForm: LoginForm;

  constructor(root: RootStore) {
    makeObservable(this, {
      onLogin: observable,
      requireRefresh: observable,

      login: action,
      verificateEmail: action,
      checkVerificationCode: action,
      register: action,
      logout: action,
      checkLoginState: action,
    });

    this.rootStore = root;
    this.onLogin = false;
    this.requireRefresh = false;

    this.authService = new AuthService();
    this.registerForm = new RegisterForm(this);
    this.loginForm = new LoginForm(this);

    this.handleToken = reaction(
      () => this.requireRefresh,
      (requireRefresh) => {
        console.log(requireRefresh);
        if (requireRefresh) {
          this.authService
            .refreshToken()
            .then((result) => {
              setStorageItem(storageAccessKey, result.accessToken);
              setStorageItem(storageRefreshKey, result.refreshToken);
              console.log(result);
            })
            .then(() => {
              this.setRequireRefresh(false);
            });
        }
      }
    );
  }

  async login(
    setShowSelectedForm: (value: React.SetStateAction<SelectedForm>) => void
  ) {
    this.authService
      .login(this.loginForm.email, this.loginForm.password)
      .then((response) => {
        this.loginForm.setLoaded(true);
        if (response.status === 200) {
          const result = response.data;
          setStorageItem(storageAccessKey, result.accessToken);
          setStorageItem(storageRefreshKey, result.refreshToken);
          this.onLogin = true;
          setShowSelectedForm("close");
        }
      })
      .catch((error) => {
        alert(error.request.response);
        this.loginForm.setLoaded(true);
      });
  }

  async verificateEmail() {
    this.authService
      .verification(this.registerForm.email)
      .then((response) => {
        this.registerForm.setLoaded(true);
        if (response.status === 201) {
          this.registerForm.setStep("verification");
        }
      })
      .catch((error) => {
        alert(error.request.response);
        this.registerForm.setLoaded(true);
        this.registerForm.setStep("email");
      });
  }

  async checkVerificationCode() {
    this.authService
      .verificationCode(this.registerForm.verificationCode)
      .then((response) => {
        this.registerForm.setLoaded(true);
        if (response.status === 200) {
          this.registerForm.setStep("password");
          alert(response.data.message);
        }
      })
      .catch((error) => {
        alert(error.request.response);
        this.registerForm.setLoaded(true);
      });
  }

  async register() {
    this.authService
      .register(this.registerForm.email, this.registerForm.password)
      .then((response) => {
        this.registerForm.setLoaded(true);
        if (response.status === 201) {
          this.registerForm.setStep("success");
        }
      })
      .catch((error) => {
        alert(error.request.response);
        this.registerForm.setLoaded(true);
        this.registerForm.setStep("email");
      });
  }

  async logout() {
    this.authService.logout();
    this.onLogin = false;
  }

  checkLoginState() {
    const token = getStorageItem(storageAccessKey, "");
    if (token.length > 0) {
      this.onLogin = true;
    } else {
      this.onLogin = false;
    }
  }

  setRequireRefresh(state: boolean) {
    this.requireRefresh = state;
  }

  refreshToken() {
    this.setRequireRefresh(true);
    // this.handleToken();
  }
}

export default AuthStore;
