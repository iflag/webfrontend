import MainPage from "pages/main-page/main-page";
import { useEffect } from "react";
import "App.scss";
import { useStoreContext } from "contexts/store-context";
import { observer } from "mobx-react";

const App = observer(() => {
  const { authStore } = useStoreContext();

  useEffect(() => {
    authStore.checkLoginState();
  }, []);

  return (
    <div className="app">
      <MainPage authStore={authStore} />
    </div>
  );
});

export default App;
