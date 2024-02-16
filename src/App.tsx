import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Login } from "./views/Login/Login";
import { ProfileSettings } from "./components/ProfileSettings/ProfileSettings";
import { AddProduct } from "./views/AddProduct/AddProduct";
import { useEffect } from "react";
import { loginFromCookie } from "./lib/loginFromCookie";
import { Toaster } from "react-hot-toast";
import { Store } from "./views/Store/Store";
import { Book } from "./views/Book/Book";

function App() {
  useEffect(() => {
    loginFromCookie().catch((error) =>
      console.log("Loogin from cookie error: ", error)
    );
  }, []);
  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-57px)] max-w-full	">
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/settings" element={<ProfileSettings />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/book/:id" element={<Book />} />
        </Routes>
        <Toaster
          toastOptions={{
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }}
        />
      </div>
    </>
  );
}

export default App;
