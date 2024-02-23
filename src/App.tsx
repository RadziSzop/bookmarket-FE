import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Login } from "./views/Login/Login";
import { ProfileSettings } from "./components/ProfileSettings/ProfileSettings";
import { AddBook } from "./views/AddBook/AddBook";
import { useEffect } from "react";
import { loginFromCookie } from "./lib/loginFromCookie";
import { Toaster } from "react-hot-toast";
import { Store } from "./views/Store/Store";
import { Book } from "./views/Book/Book";
import { NotLogged } from "./views/NotLogged/NotLogged";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

function App() {
  useEffect(() => {
    loginFromCookie().catch((error) =>
      console.log("Loogin from cookie error: ", error)
    );
  }, []);
  const profile = useSelector((state: RootState) => state.profile.profile);
  return (
    <>
      {profile ? <Navbar /> : null}
      <div className="h-[calc(100vh-57px)] max-w-full	">
        <Routes>
          <Route path="/" element={profile ? <Store /> : <NotLogged />} />
          <Route path="/not" element={<NotLogged />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/settings" element={<ProfileSettings />} />
          <Route path="/add" element={<AddBook />} />
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
