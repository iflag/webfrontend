import React, { useState } from "react";
import "components/feature/header/auth/register.scss";
import AuthService from "utils/auth-service";
import { SelectedForm } from "components/Layout/header";
import styled from "styled-components";

const LoadingSpinner = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  border: solid 0.2rem #ebebeb;
  border-top: solid 0.2rem #8bb7ee;
  animation: spin 1s linear infinite;
`;

type Props = {
  authService: AuthService;
  setShowSelectedForm: React.Dispatch<React.SetStateAction<SelectedForm>>;
};

type Steps = "email" | "verification" | "password" | "success";

const Register = ({ authService, setShowSelectedForm }: Props) => {
  const [step, setStep] = useState<Steps>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [loaded, setLoaded] = useState(true);

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

  const showEmailInput = (): React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > => {
    return (
      <form
        className="register-form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setLoaded(false);
          authService
            .verification(email)
            .then((response) => {
              setLoaded(true);
              if (response.status === 201) {
                setStep("verification");
              }
            })
            .catch((error) => {
              alert(error.request.response);
              setStep("email");
            });
        }}
      >
        {showHeader()}
        <section className="register-input">
          <input
            type="email"
            className="register-email"
            placeholder="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
            required
          />
        </section>
        <section className="register-buttons">
          <button
            className={`register-submit ${loaded ? "" : "loading"}`}
            type="submit"
          >
            {loaded ? "인증 요청하기" : <LoadingSpinner />}
          </button>
          <button
            className="register-otherOption"
            type="button"
            onClick={() => {
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
          setLoaded(false);
          authService
            .verificationCode(verificationCode)
            .then((response) => {
              setLoaded(true);
              if (response.status === 200) {
                setStep("password");
                alert(response.data.message);
              }
            })
            .catch((error) => {
              alert(error.request.response);
            });
        }}
      >
        {showHeader()}
        <section className="register-input">
          <input
            className="register-verification"
            placeholder="Verification Code"
            value={verificationCode}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setVerificationCode(e.target.value);
            }}
          />
        </section>
        <section className="register-buttons">
          <button
            className={`register-submit ${loaded ? "" : "loading"}`}
            type="submit"
          >
            {loaded ? "인증하기" : <LoadingSpinner />}
          </button>
          <button
            className="register-otherOption"
            type="button"
            onClick={() => {
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
          setLoaded(false);
          authService
            .register(email, password)
            .then((response) => {
              setLoaded(true);
              if (response.status === 201) {
                setStep("success");
              }
            })
            .catch((error) => {
              alert(error.request.response);
              setStep("email");
            });
        }}
      >
        {showHeader()}
        <section className="register-input">
          <input
            type="password"
            className="register-password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            required
          />
        </section>
        <section className="register-buttons">
          <button
            className={`register-submit ${loaded ? "" : "loading"}`}
            type="submit"
          >
            {loaded ? "회원가입 하기" : <LoadingSpinner />}
          </button>
          <button
            className="register-otherOption"
            type="button"
            onClick={() => {
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
              setStep("email");
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
              setStep("email");
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
      {step === "email" && showEmailInput()}
      {step === "verification" && showVerificationCodeInput()}
      {step === "password" && showPasswordInput()}
      {step === "success" && showSuccessPage()}
    </>
  );
};

export default Register;
