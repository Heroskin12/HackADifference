import { createBrowserRouter } from "react-router";
import Home from "./routes/Home.jsx";
import Post from "./routes/Post.jsx";
import Progress from "./routes/Progress.jsx";
import SplitScreen from "./components/SplitScreen/SplitScreen.jsx";
import User from "./routes/User.jsx";
import Settings from "./routes/Settings.jsx";
import Error from "./routes/Error.jsx";
import Series from "./routes/Series.jsx";

export default createBrowserRouter([
  {
    Component: SplitScreen,
    errorElement: Error,
    children: [
      { index: true, Component: Home },
      { path: "progress", Component: Progress },
      { path: "post/:id", Component: Post },
      { path: "user/:id", Component: User },
      { path: "settings", Component: Settings },
      { path: "series/:id", Component: Series },
      { path: "*", Component: Error },
    ],
  },
]);
