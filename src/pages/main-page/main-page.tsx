import Layout from "components/Layout";
import { observer } from "mobx-react";
import "pages/main-page/main-page.scss";
import { useEffect, lazy, Suspense } from "react";
import AuthStore from "stores/auth-store";
import NoteData from "utils/note-data";
import TodoData from "utils/todo-data";

type Props = {
  noteData: NoteData;
  todoData: TodoData;
  authStore: AuthStore;
};

const LazyTodoList = lazy(
  () => import("components/feature/main-page/memo/todo-list")
);
const LazyBookmarkSection = lazy(
  () => import("components/feature/main-page/bookmark/bookmark-section")
);
const LazyNote = lazy(() => import("components/feature/main-page/memo/note"));

const MainPage = observer(({ noteData, todoData, authStore }: Props) => {
  return (
    <Layout>
      <div className="mainpage">
        <Suspense fallback={null}>
          <LazyTodoList todoData={todoData} authStore={authStore} />
          <LazyBookmarkSection authStore={authStore} />
          <LazyNote noteData={noteData} authStore={authStore} />
        </Suspense>
      </div>
    </Layout>
  );
});

export default MainPage;
