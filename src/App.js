import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

import { HashRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import AllUsers from "./pages/AllUsers";
import SelectedUsers from "./pages/SelectedUsers";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <HashRouter basename="">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AllUsers />} />
          <Route path="/selected-users" element={<SelectedUsers />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
