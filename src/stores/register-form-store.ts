import { Steps } from "components/feature/header/auth/register";
import { action, makeObservable, observable } from "mobx";
import AuthStore from "./auth-store";

class RegisterForm {
  private rootStore: AuthStore;

  loaded: boolean;
  step: Steps;
  email: string;
  password: string;
  verificationCode: string;

  constructor(root: AuthStore) {
    makeObservable(this, {
      loaded: observable,
      step: observable,
      email: observable,
      password: observable,
      verificationCode: observable,

      setLoaded: action,
      setStep: action,
      setEmail: action,
      setVerificationCode: action,
      setPassword: action,
      resetInfo: action,
    });

    this.rootStore = root;

    this.loaded = true;
    this.step = "email";
    this.email = "";
    this.password = "";
    this.verificationCode = "";
  }

  setLoaded(newLoadState: boolean) {
    this.loaded = newLoadState;
  }
  setStep(nextStep: Steps) {
    this.step = nextStep;
  }
  setEmail(newEmail: string) {
    this.email = newEmail;
  }
  setPassword(newPassword: string) {
    this.password = newPassword;
  }
  setVerificationCode(newVerificationCode: string) {
    this.verificationCode = newVerificationCode;
  }
  resetInfo() {
    this.email = "";
    this.password = "";
    this.verificationCode = "";
  }
}

export default RegisterForm;
