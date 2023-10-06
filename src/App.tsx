import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Login } from "./pages/Login/Login";
import { ProfileSettings } from "./components/profile-settings/profile-settings";

function App() {
  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-57px)]">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile/settings" element={<ProfileSettings />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
