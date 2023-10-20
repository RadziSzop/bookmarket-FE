import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Login } from "./pages/Login/Login";
import { ProfileSettings } from "./components/profile-settings/profile-settings";
import { AddProduct } from "./components/add-product/add-product";

function App() {
  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-57px)] max-w-full	">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile/settings" element={<ProfileSettings />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
