import React from "react";
import Header from "components/Layout/header";
import Footer from "components/Layout/footer";
import UserData from "utils/user-data";
import { useStoreContext } from "contexts/store-context";
import { observer } from "mobx-react";

type Props = {
  children: React.ReactNode;
};

const userData = new UserData();

const Layout = observer(({ children }: Props) => {
  const { authStore } = useStoreContext();
  return (
    <>
      <Header userData={userData} authStore={authStore} />
      {children}
      <Footer />
    </>
  );
});

export default Layout;
