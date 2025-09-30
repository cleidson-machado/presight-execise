import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Layout from "./components/Layout";
import UserListPage from "./components/UserListPage";
import StreamPage from "./components/StreamPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/task" element={<Layout />}>
        <Route path="1" element={<UserListPage />} />
        <Route path="2" element={<StreamPage />} />
      </Route>
    </Routes>
  );
}

export default App;
