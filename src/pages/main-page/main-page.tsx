import BookmarkSection from "components/feature/main-page/bookmark/bookmark-section";
import Note from "components/feature/main-page/memo/note";
import TodoList from "components/feature/main-page/memo/todo-list";
import Layout from "components/Layout";
import { observer } from "mobx-react";
import "pages/main-page/main-page.scss";
import AuthStore from "stores/auth-store";
import NoteData from "utils/note-data";
import TodoData from "utils/todo-data";

type Props = {
  noteData: NoteData;
  todoData: TodoData;
  authStore: AuthStore;
};

const MainPage = observer(({ noteData, todoData, authStore }: Props) => {
  return (
    <Layout>
      <div className="mainpage">
        <TodoList todoData={todoData} authStore={authStore} />
        <BookmarkSection authStore={authStore} />
        <Note noteData={noteData} authStore={authStore} />
      </div>
    </Layout>
  );
});

export default MainPage;
