const version = "v1";

export const API_HOST = "https://api.iflag.co/" + version;

const API_URL = {
  users: {
    verification: "/users/verification",
    verificationCode: "/users/verification/code",
    signin: "/users/signin/",
    signup: "/users/signup",
    portal: "/users/portal",
    history: "/users/history",
    refresh: "/users/token/refresh/",
  },
  bookmarks: {
    bookmarks: "/bookmarks/",
    categories: "/bookmarks/categories/",
    search: "/bookmarks/search",
  },
  notes: {
    notes: "/notes/",
    todo: "/notes/todolist",
    completed: "/notes/todolist/completed/",
  },
};

export default API_URL;
