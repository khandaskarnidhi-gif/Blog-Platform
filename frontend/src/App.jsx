import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreatePost from "./pages/CreatePost/CreatePost";
import EditPost from "./pages/EditPost/EditPost";
import SinglePost from "./pages/SinglePost/SinglePost";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <MainLayout>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-post/:id"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />

        <Route path="/post/:id" element={<SinglePost />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;