import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Characters, CharacterDetails } from "pages/Characters";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "component/Header";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <Outlet />
          </>
        }
      >
        <Route index={true} element={<Characters />} />
        <Route path="/:id" element={<CharacterDetails />} />

        <Route path="/comics" element={"comics"} />
        <Route path="/creators" element={"creators"} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
