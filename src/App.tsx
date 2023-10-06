import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Login } from "./pages/Login/Login";
import { RegisterForm } from "./components/register-form/register-form";

function App() {
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
