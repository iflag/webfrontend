import React, { useMemo, useEffect } from "react";
import "components/feature/header/auth/register.scss";
import { SelectedForm } from "components/Layout/header";
import { LoadingSpinner } from "components/feature/header/auth/login";
import AuthStore from "stores/auth-store";
import { observer } from "mobx-react";

type Props = {
  authStore: AuthStore;
  setShowSelectedForm: React.Dispatch<React.SetStateAction<SelectedForm>>;
};

export type Steps = "email" | "verification" | "password" | "success";

const Register = observer(({ authStore, setShowSelectedForm }: Props) => {
  const { registerForm } = authStore;

  useEffect(() => {
    return () => registerForm.resetInfo();
  }, []);

  const showHeader = (): React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > => {
    return (
      <div className="register-header">
        <p className="register-title">SignUp</p>
      </div>
    );
  };

  const checkPasswordLength = useMemo((): boolean => {
    return registerForm.password.length >= 8;
  }, [registerForm.password]);

  const handleSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerForm.setLoaded(false);
    try {
      await authStore.verificateEmail();
    } catch (error) {
      alert(error.request.response);
      registerForm.setStep("email");
    }
    registerForm.setLoaded(true);
  };

  const showEmailInput = (): React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > => {
    return (
      <form
        className="register-form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmitEmail(e)}
      >
        {showHeader()}
        <section className="register-input">
          <input
            type="email"
            className="register-email"
            placeholder="Email"
            value={registerForm.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              registerForm.setEmail(e.target.value);
            }}
            required
          />
        </section>
        <section className="register-buttons">
          <button
            className={`register-submit ${
              registerForm.loaded ? "" : "loading"
            }`}
            type="submit"
          >
            {registerForm.loaded ? "인증 요청하기" : <LoadingSpinner />}
          </button>
          <button
            className="register-otherOption"
            type="button"
            onClick={() => {
              registerForm.setStep("email");
              setShowSelectedForm("login");
            }}
          >
            Login
          </button>
        </section>
      </form>
    );
  };

  const handleSubmitCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerForm.setLoaded(false);
    try {
      await authStore.checkVerificationCode();
    } catch (error) {
      alert(error.request.response);
    }
    registerForm.setLoaded(true);
  };

  const showVerificationCodeInput = (): React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > => {
    return (
      <form
        className="register-form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmitCode(e)}
      >
        {showHeader()}
        <section className="register-input">
          <input
            className="register-verification"
            placeholder="Verification Code"
            value={registerForm.verificationCode}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              registerForm.setVerificationCode(e.target.value);
            }}
          />
        </section>
        <section className="register-buttons">
          <button
            className={`register-submit ${
              registerForm.loaded ? "" : "loading"
            }`}
            type="submit"
          >
            {registerForm.loaded ? "인증하기" : <LoadingSpinner />}
          </button>
          <button
            className="register-otherOption"
            type="button"
            onClick={() => {
              registerForm.setStep("email");
              setShowSelectedForm("login");
            }}
          >
            Login
          </button>
        </section>
      </form>
    );
  };

  const handleSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkPasswordLength) return;

    registerForm.setLoaded(false);
    try {
      await authStore.register();
    } catch (error) {
      alert(error.request.response);
      registerForm.setStep("email");
    }
    registerForm.setLoaded(true);
  };

  const showPasswordInput = (): React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > => {
    return (
      <form
        className="register-form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
          handleSubmitPassword(e)
        }
      >
        {showHeader()}
        <section className="register-input">
          <input
            type="password"
            className="register-password"
            placeholder="Password"
            value={registerForm.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              registerForm.setPassword(e.target.value);
            }}
            required
          />
          <p className={`register-alert ${checkPasswordLength ? "" : "alert"}`}>
            {checkPasswordLength
              ? "사용 가능한 비밀번호 입니다"
              : "비밀번호는 8글자 이상이어야 합니다."}
          </p>
        </section>
        <section className="register-buttons">
          <button
            className={`register-submit ${
              registerForm.loaded ? "" : "loading"
            }`}
            type="submit"
          >
            {registerForm.loaded ? "회원가입 하기" : <LoadingSpinner />}
          </button>
          <button
            className="register-otherOption"
            type="button"
            onClick={() => {
              registerForm.setStep("email");
              setShowSelectedForm("login");
            }}
          >
            Login
          </button>
        </section>
      </form>
    );
  };

  const showSuccessPage = (): React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > => {
    return (
      <form className="register-form">
        {showHeader()}
        <section className="register-notification">
          <h3>회원가입에 성공하였습니다!</h3>
        </section>
        <section className="register-buttons">
          <button
            className="register-button"
            type="button"
            onClick={() => {
              registerForm.setStep("email");
              setShowSelectedForm("login");
            }}
          >
            로그인 하러가기
          </button>
        </section>
      </form>
    );
  };

  const showFailPage = (): React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > => {
    return (
      <form className="register-form">
        {showHeader()}
        <section className="register-notification">
          <h2>회원가입에 실패하였습니다!</h2>
        </section>
        <section className="register-buttons">
          <button
            className="register-button"
            type="button"
            onClick={() => {
              registerForm.setStep("email");
            }}
          >
            다시 회원가입 하러가기
          </button>
        </section>
      </form>
    );
  };

  return (
    <>
      {registerForm.step === "email" && showEmailInput()}
      {registerForm.step === "verification" && showVerificationCodeInput()}
      {registerForm.step === "password" && showPasswordInput()}
      {registerForm.step === "success" && showSuccessPage()}
    </>
  );
});

export default Register;
