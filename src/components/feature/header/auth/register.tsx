import React, { useMemo, useEffect } from "react";
import "components/feature/header/auth/register.scss";
import { SelectedForm } from "components/Layout/header";
import styled from "styled-components";
import AuthStore from "stores/auth-store";
import { observer } from "mobx-react";

const LoadingSpinner = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  border: solid 0.2rem #ebebeb;
  border-top: solid 0.2rem #8bb7ee;
  animation: spin 1s linear infinite;
`;

type Props = {
  authStore: AuthStore;
  setShowSelectedForm: React.Dispatch<React.SetStateAction<SelectedForm>>;
};

export type Steps = "email" | "verification" | "password" | "success";

const Register = observer(({ authStore, setShowSelectedForm }: Props) => {
  useEffect(() => {
    return () => authStore.registerForm.resetInfo();
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
    return authStore.registerForm.password.length >= 8;
  }, [authStore.registerForm.password]);

  const showEmailInput = (): React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > => {
    return (
      <form
        className="register-form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          authStore.registerForm.setLoaded(false);
          authStore.verificateEmail();
        }}
      >
        {showHeader()}
        <section className="register-input">
          <input
            type="email"
            className="register-email"
            placeholder="Email"
            value={authStore.registerForm.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              authStore.registerForm.setEmail(e.target.value);
            }}
            required
          />
        </section>
        <section className="register-buttons">
          <button
            className={`register-submit ${
              authStore.registerForm.loaded ? "" : "loading"
            }`}
            type="submit"
          >
            {authStore.registerForm.loaded ? (
              "인증 요청하기"
            ) : (
              <LoadingSpinner />
            )}
          </button>
          <button
            className="register-otherOption"
            type="button"
            onClick={() => {
              authStore.registerForm.setStep("email");
              setShowSelectedForm("login");
            }}
          >
            Login
          </button>
        </section>
      </form>
    );
  };

  const showVerificationCodeInput = (): React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > => {
    return (
      <form
        className="register-form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          authStore.registerForm.setLoaded(false);
          authStore.checkVerificationCode();
        }}
      >
        {showHeader()}
        <section className="register-input">
          <input
            className="register-verification"
            placeholder="Verification Code"
            value={authStore.registerForm.verificationCode}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              authStore.registerForm.setVerificationCode(e.target.value);
            }}
          />
        </section>
        <section className="register-buttons">
          <button
            className={`register-submit ${
              authStore.registerForm.loaded ? "" : "loading"
            }`}
            type="submit"
          >
            {authStore.registerForm.loaded ? "인증하기" : <LoadingSpinner />}
          </button>
          <button
            className="register-otherOption"
            type="button"
            onClick={() => {
              authStore.registerForm.setStep("email");
              setShowSelectedForm("login");
            }}
          >
            Login
          </button>
        </section>
      </form>
    );
  };

  const showPasswordInput = (): React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > => {
    return (
      <form
        className="register-form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (!checkPasswordLength) {
            return;
          }
          authStore.registerForm.setLoaded(false);
          authStore.register();
        }}
      >
        {showHeader()}
        <section className="register-input">
          <input
            type="password"
            className="register-password"
            placeholder="Password"
            value={authStore.registerForm.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              authStore.registerForm.setPassword(e.target.value);
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
              authStore.registerForm.loaded ? "" : "loading"
            }`}
            type="submit"
          >
            {authStore.registerForm.loaded ? (
              "회원가입 하기"
            ) : (
              <LoadingSpinner />
            )}
          </button>
          <button
            className="register-otherOption"
            type="button"
            onClick={() => {
              authStore.registerForm.setStep("email");
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
              authStore.registerForm.setStep("email");
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
              authStore.registerForm.setStep("email");
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
      {authStore.registerForm.step === "email" && showEmailInput()}
      {authStore.registerForm.step === "verification" &&
        showVerificationCodeInput()}
      {authStore.registerForm.step === "password" && showPasswordInput()}
      {authStore.registerForm.step === "success" && showSuccessPage()}
    </>
  );
});

export default Register;
