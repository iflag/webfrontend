import React from "react";
import Header from "components/Layout/header";
import Footer from "components/Layout/footer";
import UserData from "utils/user-data";
import AuthService from "utils/auth-service";

type Props = {
  children: React.ReactNode;
};

const userData = new UserData();
const authService = new AuthService();

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header userData={userData} authService={authService} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
