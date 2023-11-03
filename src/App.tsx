import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Login } from "./pages/Login/Login";
import { RegisterForm } from "./components/register-form/register-form";
import { useEffect } from "react";
import { loginFromCookie } from "./lib/loginFromCookie";

function App() {
  useEffect(() => {
    loginFromCookie().catch((error) =>
      console.log("Loogin from cookie error: ", error)
    );
  }, []);
  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-57px)]">
        <Routes>
          <Route path="/books" element={<RegisterForm />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
