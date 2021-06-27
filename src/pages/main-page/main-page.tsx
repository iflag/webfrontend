import Layout from "components/Layout";
import { observer } from "mobx-react";
import "pages/main-page/main-page.scss";
import { lazy, Suspense } from "react";
import AuthStore from "stores/auth-store";

type Props = {
  authStore: AuthStore;
};

const LazyTodoList = lazy(
  () => import("components/feature/main-page/memo/todo-list")
);
const LazyBookmarkSection = lazy(
  () => import("components/feature/main-page/bookmark/bookmark-section")
);
const LazyNote = lazy(() => import("components/feature/main-page/memo/note"));

const MainPage = observer(({ authStore }: Props) => {
  return (
    <Layout>
      <div className="mainpage">
        <Suspense fallback={null}>
          <LazyTodoList authStore={authStore} />
          <LazyBookmarkSection authStore={authStore} />
          <LazyNote authStore={authStore} />
        </Suspense>
      </div>
    </Layout>
  );
});

export default MainPage;
