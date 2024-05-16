import React from "react";
import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/home/Home";
import Community from "./pages/community/Community";
import MyPage from "./pages/mypage/MyPage";
import Admin from "./pages/admin/Admin";
import PlanLayout from "./layouts/PlanLayout";
import UserLayout from "./layouts/UserLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route element={<UserLayout />}>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Route>
      <Route path="/planning/:metro" element={<PlanLayout />} />
    </Routes>
  );
};

export default App;
