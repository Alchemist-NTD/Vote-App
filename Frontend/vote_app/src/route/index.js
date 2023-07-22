import React from "react";
import { path } from "./path";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/homepage/HomePage";
import Login from "../pages/login/Login";
import PollDetail from "../pages/pollsdetail/PollDetail";
import PollCreate from "../pages/createpoll/PollCreate";
import MyPoll from "../pages/mypoll/MyPoll";
import Layout from "../layout/Layout";
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={path.POLL_DETAIL} element={<PollDetail />} />
          <Route path={path.POLL_CREATE} element={<PollCreate />} />
          <Route path={path.MY_POLL} element={<MyPoll />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
