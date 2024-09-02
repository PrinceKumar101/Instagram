import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./components/Home";
import Search from "./components/Search";
import Explore from "./components/Explore";
import Message from "./components/Message";
import Notification from "./components/Notification";
import NewPost from "./components/NewPost";
import Profile from "./components/Profile";
import ProfileBox from "./components/ProfileBox";
import Login from "./components/Login";
import Signup from "./components/Signup";
export const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/message",
        element: <Message />,
      },
      {
        path: "/notification",
        element: <Notification />,
      },
      {
        path: "/create_new_post",
        element: <NewPost />,
      },
      {
        path: "/profile",
        element: <Profile />,
        children: [
          {
            path: "/profile/post",
            element: <ProfileBox />,
          },
          {
            path: "/profile/saved",
            element: <ProfileBox />,
          },
          {
            path: "/profile/tagged",
            element: <ProfileBox />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign_up",
        element: <Signup />,
      },
    ],
  },
  
]);
