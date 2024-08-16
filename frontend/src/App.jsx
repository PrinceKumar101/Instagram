import React from "react";
import { RouterProvider } from "react-router-dom";
import { BrowserRouter } from "./BrowserRouter";

const App = () => {
  return (
    <>
      <RouterProvider router={BrowserRouter} />
    </>
  );
};

export default App;
